# Blog Analytics and Search Tool

This Express.js application serves as a blog analytics and search tool that fetches data from a third-party blog API, performs analytics, and allows users to search for blogs based on keywords. The tool provides insightful statistics about the fetched blog data and enables users to perform searches with a user-friendly API.

## Features

- **Data Retrieval:** Fetches blog data from a third-party API.

- **Data Analysis:**
  - Calculates the total number of blogs fetched.
  - Identifies the blog with the longest title.
  - Determines the number of blogs with titles containing the word "privacy."
  - Creates an array of unique blog titles (no duplicates).

- **Response:** Provides JSON responses containing:
  - Total number of blogs.
  - Title of the longest blog.
  - Number of blogs with "privacy" in the title.
  - An array of unique blog titles.

- **Blog Search Endpoint:** Implements a search functionality based on query parameters, allowing users to filter blogs by keyword (case-insensitive).

- **Error Handling:** Handles errors gracefully during data retrieval, analysis, or search processes. Provides appropriate error messages in case of issues.

## Installation

1. Clone the repository:
```
git clone <repository-url>
```

2. Install dependencies:
```
npm install
```

3. Start the application:
```
nodemon app.js
```

## App will run on http://localhost:3000/

## API Routes

- **Fetch Blog Statistics:**
  - **Route:** `http://localhost:3000/api/blog-stats`
  - **HTTP Method:** GET
  - **Description:** Retrieves insightful statistics about the fetched blog data, including the total number of blogs, the title of the longest blog, the number of blogs with "privacy" in the title, and an array of unique blog titles.

- **Search Blogs:**
  - **Route:** `http://localhost:3000/api/blog-search`
  - **HTTP Method:** GET
  - **Description:** Implements a search functionality that allows users to filter blogs based on a keyword query (case-insensitive).

  - **Query Parameters:**
    - `query`: The keyword to search for in blog titles.

  - **Example Usage:**
    - To search for blogs containing the word "privacy":

      ```
      http://localhost:3000/api/blog-search?query=privacy
      ```

- **Error Handling:**
  - The application handles errors gracefully during data retrieval, analysis, or search processes. It provides appropriate error messages in case of issues, ensuring a robust user experience.

- **Bonus Challenge (Caching):**
  - Implemented a caching mechanism to store analytics results and search results for a certain period. Cached results are returned for repeated requests within the caching period, reducing load on the API.

