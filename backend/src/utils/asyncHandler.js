// Define a higher order function named asyncHandler that takes a function called requestHandler as input
const asyncHandler = (requestHandler) => {
  // Return an asynchronous function that takes req, res, and next as parameters
  return async (req, res, next) => {
    // Try to execute the provided requestHandler asynchronously with the provided req, res, and next parameters
    try {
      await requestHandler(req, res, next); // Await the execution of the requestHandler
    } catch (error) {
      // If an error occurs during the execution of the requestHandler, catch it
      // Set the HTTP status code of the response to the error's code if available, otherwise set it to 500 (Internal Server Error),
      // and send a JSON response with success set to false and the error message.
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
};

// Export the asyncHandler function for use in other modules
export { asyncHandler };
