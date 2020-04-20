const { youtube_v3 } = require('googleapis');

const { YOUTUBE_API_KEY } = process.env;

const cache = {
  lastFetch: 0,
  counter: 0,
  videosItems: [],
};

const fetchVideos = async () => {
  const youtube = new youtube_v3.Youtube();
  const results = await youtube.search.list({
    channelId: 'UCqawL4rsFulZi1zjpromBNQ',
    maxResults: 25,
    part: 'id,snippet',
    auth: YOUTUBE_API_KEY,
  });

  cache.lastFetch = Date.now();
  cache.counter = 0;

  cache.videosItems = results.data.items.map(({
    snippet: {
      title,
      channelTitle,
      description,
      publishedAt,
      thumbnails: {
        default: {
          url: imageUrl,
        },
      },
    },
  }) => {
    return ({
      title,
      channelTitle,
      description,
      publishedAt,
      imageUrl,
    });
  });
}

exports.handler = async (event, context) => {
  try {
    const shouldFetchVideos = Date.now() - cache.lastFetch > 21600000;
    if (shouldFetchVideos) {
      await fetchVideos();
    }

    cache.counter = cache.counter + 1;

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      },
      body: JSON.stringify(cache),
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
