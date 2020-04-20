const { youtube_v3 } = require('googleapis');

const { API_KEY } = process.env;

const cache = {
  counter: 0,
};

exports.handler = async (event, context) => {
  try {
    const youtube = new youtube_v3.Youtube();
    const results = await youtube.search.list({
      q: 'dogs', 
      maxResults: 25,
      part: 'id,snippet',
      auth: API_KEY,
    });

    cache.counter = cache.counter + 1;

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      },
      body: JSON.stringify({
        ...results,
        ...cache,
      }),
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
