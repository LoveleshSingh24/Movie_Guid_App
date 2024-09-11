exports.handler = async (event) => {
    const fetch = await import('node-fetch').then(mod => mod.default);
    const movie = event.queryStringParameters.movie;
    const apiKey = process.env.OMDB_API_KEY;

    const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('Error fetching movie data:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Unable to fetch movie data' }),
        };
    }
};
