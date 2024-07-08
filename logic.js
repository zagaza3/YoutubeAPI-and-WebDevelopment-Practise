const videoIds = [
    'vLh-jBC9l-E',
    'W93XyXHI8Nw',
    'WCyB8m4KBxw',
];

function getRandomVideoId() {
    const randomIndex = Math.floor(Math.random() * videoIds.length);
    return videoIds[randomIndex];
}

function setRandomVideo(iframeId) {
    const iframe = document.getElementById(iframeId);
    if (iframe) {
        const randomVideoId = getRandomVideoId();
        iframe.src = `https://www.youtube.com/embed/${randomVideoId}`;
    }
}

function getVideoTitle(iframeId, titleId) {
    const iframe = document.getElementById(iframeId);
    const titleElement = document.getElementById(titleId);

    if (iframe) {
        const src = iframe.getAttribute('src');

        if (src.includes('youtube.com/embed')) {
            const videoId = src.split('/').pop();

            fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=*key*`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.items && data.items.length > 0) {
                        const videoTitle = data.items[0].snippet.title;
                        titleElement.textContent = videoTitle;
                    } else {
                        console.error('No items found in the API response.');
                    }
                })
                .catch(error => console.error('Error fetching video information:', error));
        } else {
            console.error('Not a valid YouTube embed code.');
        }
    } else {
        console.error('Iframe not found.');
    }
}

window.onload = function() {
    setRandomVideo('YTVid1');
    setRandomVideo('YTVid2');
    
    // Delay fetching the titles to ensure iframes have updated
    setTimeout(() => {
        getVideoTitle('YTVid1', 'Vid1');
        getVideoTitle('YTVid2', 'Vid2');
    }, 1000); // 1-second delay
};
