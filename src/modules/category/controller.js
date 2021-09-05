const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const { CustomError } = require("../../utils/customError");

const { CATEGORIES_TABLE, IS_OFFLINE } = process.env;
const dynamoDbClient =
  IS_OFFLINE === "true"
    ? new AWS.DynamoDB.DocumentClient({
        region: "localhost",
        endpoint: "http://localhost:8000",
      })
    : new AWS.DynamoDB.DocumentClient();

exports.getItem = async ({ id }) => {
  const params = {
    TableName: CATEGORIES_TABLE,
    Key: {
      id,
    },
  };

  try {
    const data = await dynamoDbClient.get(params).promise();

    return data.Item;
  } catch (error) {
    throw new CustomError("Error while getting item");
  }
};

exports.putItem = async (data) => {
  const params = {
    TableName: CATEGORIES_TABLE,
    Item: {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      ...data,
    },
  };

  try {
    await dynamoDbClient.put(params).promise();

    return params.Item;
  } catch (error) {
    throw new CustomError("Error while creating item");
  }
};

exports.scanItem = async () => {
  const params = {
    TableName: CATEGORIES_TABLE,
  };

  try {
    const data = await dynamoDbClient.scan(params).promise();

    return data.Items;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    throw new CustomError("Error while scanning item");
  }
};

exports.updateItem = async ({ id, name }) => {
  const params = {
    TableName: CATEGORIES_TABLE,
    Key: {
      id,
    },
    UpdateExpression: "set #a = :name",
    ExpressionAttributeNames: {
      "#a": "name",
    },
    ExpressionAttributeValues: {
      ":name": name,
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const data = await dynamoDbClient.update(params).promise();

    return data.Attributes ? data.Attributes : data;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    throw new CustomError("Error while updating item");
  }
};

exports.deleteItem = async ({ id }) => {
  const params = {
    TableName: CATEGORIES_TABLE,
    Key: {
      id,
    },
  };

  try {
    await dynamoDbClient.delete(params).promise();

    return true;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    throw new CustomError("Error while getting item");
  }
};
