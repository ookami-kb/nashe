var currentArtist;
var currentSong;
var player;

function getInfo(repeat, callBack) {
    var pageRequest = new XMLHttpRequest();
    pageRequest.open("GET", "http://radiopleer.com/info/nashe.txt", true);
    pageRequest.onload = function() {
        var obj = JSON.parse(this.responseText);
        var artist = obj.artist || "Исполнитель не указан";
        var song = obj.song || "Песня не указана";
        callBack(artist, song);
        if (player.infoCallback !== undefined) {
            player.infoCallback(artist, song);
        }
    };
    pageRequest.send();
    if (repeat) {
        return setTimeout(function() {getInfo(repeat, callBack)}, 20000);
    }
}

var callback = function(artist, song) {
    if ((currentArtist != artist || currentSong != song)) {
        currentArtist = artist;
        currentSong = song;

        chrome.notifications.create("nashe", {
            type: "basic",
            title: artist,
            message: song,
            iconUrl: "icon_notification.png"
        }, function(id) {});
        setTimeout(function() {
            chrome.notifications.clear("nashe", function(wasCleared) {});
        }, 5000);
    }
};

document.addEventListener('DOMContentLoaded', function () {
   player = {
       playing: false,
       element: document.getElementById("player"),
       play: function() {
           this.playing = true;
           this.element.play();
           getInfo(true, callback);
       },
       stop: function() {
           window.location.reload();
       },
       infoCallback: undefined
   }
});