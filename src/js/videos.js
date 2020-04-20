const renderVideos = ({
  videosItems,
}) => {
  const $videosConteiner = document.getElementById('videos');
  const $videoTemplate = document.getElementById('videoTemplate');

  videosItems.forEach((video) => {
    console.log({ video });
    const $videosListItem = $videoTemplate.content.cloneNode(true);
    const $title = $videosListItem.querySelector('.Video__Title');
    const $channelTitle = $videosListItem.querySelector('.Video__ChannelTitle');
    const $description = $videosListItem.querySelector('.Video__Description');
    const $publishDate = $videosListItem.querySelector('.Video__PublishDate');
    const $image = $videosListItem.querySelector('.Video__Image');

    $title.innerText = video.snippet.title;
    $channelTitle.innerText = video.snippet.channelTitle;
    $description.innerText = video.snippet.description;    
    $publishDate.innerText = new Date(video.snippet.publishedAt).toDateString();
    $image.src = video.snippet.thumbnails.default.url;

    $videosConteiner.appendChild($videosListItem);
  });
};

export const createVideos = () => {
  fetch('/videos')
    .then((response) => response.json())
    .then(({ data }) => {
      renderVideos({
        videosItems: data.items,
      });
    });
}