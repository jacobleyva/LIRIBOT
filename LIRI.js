require("dotenv").config();

const fs = require("fs");
const request = require("request");
const Spotify = require('node-spotify-api');
/*****************************************/
//argument inputs
const userCommand = process.argv[2];
const secondCommand = process.argv[3];

for (const i = 4; i < process.argv.length; i++) {
    secondCommand += '+' + process.argv[i];
}
/*****************************************/
// Fetch Spotify Keys
const spotify = new Spotify(keys.spotify);

// Writes to the log.txt file
const getArtistNames = function (artist) {
    return artist.name;
};
/*****************************************/
//spotify
const getSpotify = function (songName) {
    if (songName === undefined) {
        songName = "What's my age again";
    }
    spotify.search(
        {
            type: "track",
            query: userCommand
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            const songs = data.tracks.items;
            for (const i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("artist(s): " + songs[i].artists.map(getArtistNames));
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("-----------------------------------");
            }
        }
    );
};
/*****************************************/
//Switch command
function mySwitch(userCommand) {
    switch (userCommand) {
        case "spotify-this-song":
            getSpotify();
            break;

        case "movie-this":
            getMovie();
            break;

        case "do-what-it-says":
            doWhat();
            break;
    }
}
/*****************************************/
//omdb
function getMovie() {
    const movieName = secondCommand;
    const Url = `http://www.omdbapi.com/?t=${movieName}&y=&plot=short&tomatoes=true&apikey=trilogy`;

    request(Url, function (error, response, body) {
        if (!error && response.statusCode === 100) {
            const body = JSON.parse(body);
            console.log('----------------------');
            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year);
            console.log("IMdB Rating: " + body.imdbRating);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            console.log("Rotten Tomatoes Rating: " + body.Ratings[2].Value);
            console.log("URL: " + body.tomatoURL);
            console.log('----------------------');
        } else {
            console.log("Err")
    }});
}
    //do what it says
function doWhat() {
    fs.readFile("dowhatitsays.txt", "utf8", function (error, data) {
        if (!error);
        console.log(data.toString());
    });
}
mySwitch(userCommand);
