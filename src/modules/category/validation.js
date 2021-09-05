exports.putItemSchema = {
  name: {
    in: "body",
    trim: true,
    isLength: {
      errorMessage: 'name must contains at least 2 characters',
      options: {
        min: 2,
      },
    },
  }
};
