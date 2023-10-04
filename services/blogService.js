const axios = require('axios');
const _ = require('lodash');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 600 });

const validateBlogData = (data) => {
    if (!Array.isArray(data.blogs)) {
        throw new Error('Invalid blog data format: Expected an array of blogs.');
    }

    // Ensure that each blog object has 'id', 'image_url', and 'title' properties
    const isValidBlog = (blog) =>
        blog.id && typeof blog.id === 'string' &&
        blog.image_url && typeof blog.image_url === 'string' &&
        blog.title && typeof blog.title === 'string';

    if (!data.blogs.every(isValidBlog)) {
        throw new Error('Invalid blog data format: Each blog should have id, image_url, and title properties.');
    }
};

const fetchBlogData = async () => {
    try {
        // Check if data is already cached
        const cachedData = cache.get('blogData');
        if (cachedData) {
            return cachedData;
        }

        // Make the API request
        const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
            headers: {
                'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
            },
        });

        const blogData = response.data;

        // Validate the received blog data
        validateBlogData(blogData);

        // Calculate analytics
        const totalBlogs = blogData.blogs.length;
        const longestTitleBlog = _.maxBy(blogData.blogs, (blog) => blog.title.length) || {};
        const privacyTitleBlogs = blogData.blogs.filter((blog) =>
            blog.title.toLowerCase().includes('privacy')
        );
        const uniqueTitles = _.uniqBy(blogData.blogs, 'title');

        // Create a response object
        const responseData = {
            totalBlogs,
            longestBlogTitle: longestTitleBlog.title || 'N/A',
            blogsWithPrivacyTitle: privacyTitleBlogs.length,
            uniqueBlogTitles: uniqueTitles.map((blog) => blog.title),
        };

        // Cache the data for future requests
        cache.set('blogData', responseData);

        return responseData;
    } catch (error) {
        console.error('Error fetching and analyzing data:', error.message);
        throw new Error('Error fetching and analyzing data: ' + error.message);
    }
};

// The rest of the code remains the same.
const searchBlogs = async (query) => {
    // Check if data is already cached
    const cachedData = cache.get(`search:${query}`);
    if (cachedData) {
        console.log('Cached Data Retrieved');
        return cachedData;
    }

    // Fetch data from the third-party API
    try {
        const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
            headers: {
                'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
            },
        });

        const blogData = response.data.blogs;

        if (!Array.isArray(blogData)) {
            throw new Error('Invalid blog data received from the API');
        }

        // Filter blogs based on the query
        const filteredBlogs = blogData.filter((blog) =>
            blog.title.toLowerCase().includes(query)
        );

        // Cache the search results for future requests
        cache.set(`search:${query}`, filteredBlogs);

        return filteredBlogs;
    } catch (error) {
        throw new Error('Error fetching blog data for search: ' + error.message);
    }
};

module.exports = {
    fetchBlogData,
    searchBlogs,
};