const axios = require('axios');
const _ = require('lodash');

// Create a memoized function to cache the results of fetchBlogData
const memoizedFetchBlogData = _.memoize(async () => {
    try {
        // Make the API request
        const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
            headers: {
                'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
            },
        });

        const blogData = response.data.blogs;

        // Calculate analytics
        const totalBlogs = blogData.length;
        const longestTitleBlog = _.maxBy(blogData, (blog) => blog.title.length) || {};
        const privacyTitleBlogs = blogData.filter((blog) =>
            blog.title.toLowerCase().includes('privacy')
        );
        const uniqueTitles = _.uniqBy(blogData, 'title');

        // Create a response object
        const responseData = {
            totalBlogs,
            longestBlogTitle: longestTitleBlog.title || 'N/A',
            blogsWithPrivacyTitle: privacyTitleBlogs.length,
            uniqueBlogTitles: uniqueTitles.map((blog) => blog.title),
        };

        return responseData;
    } catch (error) {
        throw new Error('Error fetching and analyzing data: ' + error.message);
    }
}, () => 'blogData'); // Specify a cache key for memoization

// Create a memoized function to cache the results of searchBlogs
const memoizedSearchBlogs = _.memoize(async (query) => {
    try {
        // Make the API request
        const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
            headers: {
                'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
            },
        });

        const blogData = response.data.blogs;

        // Filter blogs based on the query
        const filteredBlogs = blogData.filter((blog) =>
            blog.title.toLowerCase().includes(query)
        );

        return filteredBlogs;
    } catch (error) {
        throw new Error('Error fetching blog data for search: ' + error.message);
    }
}, (query) => `search:${query}`); // Specify a cache key for memoization

const fetchBlogData = async () => {
    return await memoizedFetchBlogData();
};

const searchBlogs = async (query) => {
    return await memoizedSearchBlogs(query);
};

// Export the fetchBlogData and searchBlogs functions
module.exports = {
    fetchBlogData,
    searchBlogs,
};
