const symbolPlay = '⯈';
const symbolPause = '❚ ❚';
const files = ['Nature-8399','River-655','Waterfall-941','Wave-2737'];
const aside = document.querySelector("aside");
const videoPlayer = document.getElementById("vidPlayer");
const playButton = document.getElementById("play");
const stopButton = document.getElementById("stop");
const skipForwardButton = document.querySelector('[data-skip="5"]');
const skipBackwardButton = document.querySelector('[data-skip="-5"]');
const skipTimePreset = 5;

for (img of files) {
    let thumbnail = document.createElement("img");
    thumbnail.src = `images/${img}.jpg`;
    aside.appendChild(thumbnail);
}

aside.addEventListener("click", function(e){
    if(e.target && e.target.nodeName == "IMG"){
        let src = e.target.src;
        let fileWithExt = src.substring(src.lastIndexOf('/') + 1);
        let fileName = fileWithExt.replace('.jpg', '');
        let videoSource = document.querySelector("video > source");
        videoSource.src = `videos/${fileName}.mp4`
        videoPlayer.load();
        playButton.textContent = symbolPlay;
    }
});

playButton.addEventListener("click", function(){
    if (videoPlayer.paused) {
        videoPlayer.play();
        playButton.textContent = symbolPause;
    }
    else{
        videoPlayer.pause();
        playButton.textContent = symbolPlay;
    }
})

stopButton.addEventListener("click", function(){
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    playButton.textContent = symbolPlay;
})

skipForwardButton.addEventListener("click", function(){
    if (videoPlayer.currentTime + skipTimePreset > videoPlayer.duration){
        playButton.textContent = symbolPlay;
    }
    videoPlayer.currentTime += skipTimePreset;
})

skipBackwardButton.addEventListener("click", function(){
    videoPlayer.currentTime -= skipTimePreset;
})

videoPlayer.addEventListener("ended", function() {
    playButton.textContent = symbolPlay;
});