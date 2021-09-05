const aws = require("aws-sdk");
const { getItem } = require("../controller");
const { CustomError } = require("../../../utils/customError");

const TABLE_NAME = "category-table";

jest.mock("aws-sdk");

describe("Test category handler functions", () => {

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("should get a user", async () => {
    const mResult = { Item: { name: "item test", id: 1 } };

    aws.DynamoDB.DocumentClient.prototype.get.mockImplementation((_) => {
      return {
        promise: () => {
          return new Promise((resolve) => {
            resolve(mResult);
          });
        },
      };
    });
    const data = await getItem({ id: 1 });

    expect(data).toEqual(mResult.Item);
    expect(aws.DynamoDB.DocumentClient.prototype.get).toBeCalledWith({
      TableName: TABLE_NAME,
      Key: {
        id: 1,
      },
    });
  });

  it("should throw an error", async () => {
    const errorMessage = "Error while getting item";
    const mError = new CustomError(errorMessage);

    aws.DynamoDB.DocumentClient.prototype.get.mockImplementation((_) => {
      return {
        promise: () => {
          return new Promise((_, reject) => {
            reject(mError);
          });
        },
      };
    });

    await expect(getItem({})).rejects.toThrow(mError);
    expect(aws.DynamoDB.DocumentClient.prototype.get).toBeCalledWith({
      TableName: TABLE_NAME,
      Key: {
        id: undefined,
      },
    });
  });
});
