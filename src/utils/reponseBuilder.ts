export const ResponseBuilder = {
  success: (
    data: any,
    message: string = "Success",
    statusCode: number = 200
  ) => {
    return {
      statusCode,
      message,
      data,
    };
  },
  error: (message: string, statusCode: number = 500) => {
    return {
      status: "error",
      message,
      statusCode,
    };
  },
  notFound: (message: string = "Not Found") => {
    return {
      status: "error",
      message,
      statusCode: 404,
    };
  },
};
