const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const movie = event.queryStringParameters.movie;  // Get the movie name from query params
    const apiKey = process.env.OMDB_API_KEY;          // Fetch API key from environment variables

    const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`;

    try {
        const response = await fetch(url);            // Fetch data from OMDb API
        const data = await response.json();           // Parse response data

        return {
            statusCode: 200,
            body: JSON.stringify(data),               // Return movie data
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Unable to fetch movie data' }), // Handle errors
        };
    }
};
