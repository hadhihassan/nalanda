export const errorHandler = (error, req, res, next) => {
    console.error(error);
    res.status(500).json({
        errors: [{ message: error.message || "Something went wrong" }],
    });
};