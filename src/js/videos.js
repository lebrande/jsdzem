const renderVideos = ({
  videosItems,
}) => {
  const $videosConteiner = document.getElementById('videos');
  const $videoTemplate = document.getElementById('videoTemplate');

  videosItems.forEach(({
    title,
    channelTitle,
    description,
    publishedAt,
    imageUrl,
  }) => {
    const $videosListItem = $videoTemplate.content.cloneNode(true);

    const $title = $videosListItem.querySelector('.Video__Title');
    const $channelTitle = $videosListItem.querySelector('.Video__ChannelTitle');
    const $description = $videosListItem.querySelector('.Video__Description');
    const $publishDate = $videosListItem.querySelector('.Video__PublishDate');
    const $image = $videosListItem.querySelector('.Video__Image');

    $title.innerText = title;
    $channelTitle.innerText = channelTitle;
    $description.innerText = description;    
    $publishDate.innerText = new Date(publishedAt).toDateString();
    $image.src = imageUrl;

    $videosConteiner.appendChild($videosListItem);
  });
};

export const createVideos = () => {
  fetch('/videos')
    .then((response) => response.json())
    .then(({ videosItems }) => {
      renderVideos({
        videosItems,
      });
    });
}