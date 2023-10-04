const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const blogRoutes = require('./routes/blogRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

app.use(express.json());

// Routes
app.use('/api', blogRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
