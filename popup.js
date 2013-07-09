var infoCallback = function(artist, song) {
    document.getElementById("artist").innerHTML = artist;
    document.getElementById("song").innerHTML = song;
};

document.addEventListener('DOMContentLoaded', function () {
    var playBtn = document.getElementById("play");
    var stopBtn = document.getElementById("stop");

    if (chrome.extension.getBackgroundPage().player.playing) {
        stopBtn.style.display = 'block';
        playBtn.style.display = 'none';

        chrome.extension.getBackgroundPage().player.infoCallback = infoCallback;
        chrome.extension.getBackgroundPage().getInfo(false, function(){});
    } else {
        stopBtn.style.display = 'none';
        playBtn.style.display = 'block';
    }

    playBtn.onclick = function() {
        chrome.extension.getBackgroundPage().player.play();
        stopBtn.style.display = 'block';
        playBtn.style.display = 'none';
        chrome.extension.getBackgroundPage().player.infoCallback = infoCallback;
    };
    stopBtn.onclick = function() {
        chrome.extension.getBackgroundPage().player.stop();
        stopBtn.style.display = 'none';
        playBtn.style.display = 'block';
        chrome.extension.getBackgroundPage().player.infoCallback = undefined;
        document.getElementById("artist").innerHTML = "";
        document.getElementById("song").innerHTML = "";
    };
});

