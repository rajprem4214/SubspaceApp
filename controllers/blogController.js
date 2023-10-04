const blogService = require('../services/blogService');

const getBlogStats = async (req, res) => {
    try {
        const blogData = await blogService.fetchBlogData();
        res.json(blogData);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
};

const searchBlogs = async (req, res) => {
    const query = req.query.query.toLowerCase();
    try {
        const searchResults = await blogService.searchBlogs(query);
        res.json(searchResults);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while processing the search request.' });
    }
};

module.exports = {
    getBlogStats,
    searchBlogs,
};
