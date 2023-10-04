const errorMiddleware = (err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'An internal server error occurred.' });
};

module.exports = errorMiddleware;
