const express = require("express");
const validator = require("express-validator");
const asyncMiddleware = require("../../middleware/asyncMiddleware");
const responseHandlerMiddleware = require("../../middleware/responseHandlerMiddleware");
const validationHandlerMiddleware = require("../../middleware/validationHandlerMiddleware");
const validationSchema = require("./validation");
const {
    getItem,
    putItem,
    scanItem,
    updateItem,
    deleteItem,
  } = require('./controller');

const router = express.Router();

router.get(
  "/:id",
  asyncMiddleware(async (req, res, next) => {
    const data = {
      ...req.params,
    };

    res.locals.data = await getItem(data);

    next();
  }),
  responseHandlerMiddleware
);

router.get(
  "/",
  asyncMiddleware(async (req, res, next) => {

    res.locals.data = await scanItem();

    next();
  }),
  responseHandlerMiddleware
);

router.post(
  "/create",
  validator.checkSchema(validationSchema.putItemSchema),
  validationHandlerMiddleware,
  asyncMiddleware(async (req, res, next) => {
    const data = {
      ...req.body,
    };

    res.locals.data = await putItem(data);

    next();
  }),
  responseHandlerMiddleware
);

router.put(
  "/update",
  validator.checkSchema(validationSchema.putItemSchema),
  validationHandlerMiddleware,
  asyncMiddleware(async (req, res, next) => {
    const data = {
      ...req.body,
    };

    res.locals.data = await updateItem(data);

    next();
  }),
  responseHandlerMiddleware
);

router.delete(
    "/:id",
    asyncMiddleware(async (req, res, next) => {
      const data = {
        ...req.params,
      };
  
      res.locals.data = await deleteItem(data);
  
      next();
    }),
    responseHandlerMiddleware
  );

module.exports = router;