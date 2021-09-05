exports.successMessage = function (data, ...rest) {
  const dataToReturn = {
    success: true,
    data: data,
  };

  if (rest.length > 0) dataToReturn.meta = [...rest];

  return dataToReturn;
};
