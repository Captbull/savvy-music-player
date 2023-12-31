document.title = "SAVVY MUSIC PLAYER";

const track_art = document.querySelector(".track-art");
const track_name = document.querySelector(".track-name");
const track_artist = document.querySelector(".track-artist");

const playpause_btn = document.querySelector(".playpause-track");
const next_btn = document.querySelector(".next");
const prev_btn = document.querySelector(".prev");

const seek_slider = document.querySelector(".seek_slider");
const curr_time = document.querySelector(".current-time");
const total_duration = document.querySelector(".total-duration");

const playListContainer = document.querySelector(".playlistContainer");

// GLobal variables
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement("audio");

// Define the list of tracks that have to be played
let track_list = [
  {
    name: "Forgive and Forget",
    artist: "Tu Face",
    image:
      "./images/286.jpg",
    // path: "Enthusiast.mp3",
    path: "./tracks/2face forgive and forget.mp3",
  },
  {
    name: "Halo",
    artist: "Beyonce",
    image: "./images/286.jpg",
    // path: "Enthusiast.mp3",
    path: "./tracks/Beyonce_-_Halo.mp3",
  },
  {
    name: " Catalyna y Sebastine",
    artist: "Catalyna & Sebastine",
    image: "./images/286.jpg",
    path: "./tracks/catalina_y_sebastian_mp3_25721.mp3",
  },
  {
    name: "With you",
    artist: "Chris Brown ft Jordine Sparks",
    image: "./images/286.jpg",
    path: "./tracks/Chris Brown-with u.mp3",
  },
  {
    name: "Clocks",
    artist: "Coldplay",
    image:
      "./images/286.jpg",
    path: "./tracks/COLDPLAY-Paradise.mp3",
  },

  {
    name: "Lift Me Up",
    artist: "Rihanna",
    image:
      "https://upload.wikimedia.org/wikipedia/en/4/43/Rihanna_-_Lift_Me_Up.png",
    path: "./tracks/liftMeUp.mp3",
  },
  {
    name: "Charm",
    artist: "Rema",
    image: "https://i1.sndcdn.com/artworks-W9BryrRWcopy-0-t500x500.jpg",
    path: "./tracks/Charm.mp3",
  },
  {
    name: "Somewhere Only We Know",
    artist: "Keane",
    image: "https://i1.sndcdn.com/artworks-000162294097-c1g2xw-t500x500.jpg",
    // path: "Enthusiast.mp3",
    path: "./tracks/somewhereOnlyWeKnow.mp3",
  },
  {
    name: "Believe Me",
    artist: "Johnny Drille",
    image: "https://naijamz.com/images/Johnny-Drille-Believe-Me-artwork.jpg",
    // path: "Enthusiast.mp3",
    path: "./tracks/BelieveMe.mp3",
  },
  {
    name: "Body and Soul",
    artist: "Joeboy",
    image: "https://trendybeatz.com/images/Joeboy-Body-and-Soul-Artwork.jpg",
    // path: "Enthusiast.mp3",
    path: "./tracks/BodyandSoul.mp3",
  },
  {
    name: "Abracadabra",
    artist: "Rexxie",
    image: "https://9jadailyfeeds.com.ng/wp-content/uploads/2023/02/Abracadabra.webp",
    // path: "Enthusiast.mp3",
    path: "./tracks/Rexxie-Abracadabra-Remix-feat-Naira-Marley-Skiibii-Wizkid-(JustNaija.com).mp3",
  },
 
  {
    name: "New Religion",
    artist: "Olamide ft Asake",
    image: "https://trendybeatz.com/images/Olamide-Ft-Asake-New-Religion-Artwork.jpg",
    // path: "Enthusiast.mp3",
    path: "./tracks/Olamide-New-Religion-ft-Asake-(JustNaija.com).mp3",
  },
  {
    name: "Someone",
    artist: "Fireboy",
    image: "https://i0.wp.com/justnaija.com/uploads/2023/05/Fireboy-DML-Someone-artwork.jpeg?ulb=false&ssl=1&resize=320,350",
    // path: "Enthusiast.mp3",
    path: "./tracks/Fireboy-DML-Someone-(JustNaija.com).mp3",
  },
  {
    name: "In My Mind",
    artist: "BNXN",
    image: "https://i0.wp.com/justnaija.com/uploads/2022/08/Buju-BNXN-In-My-Mind-artwork_12.jpg?ulb=false&ssl=1&resize=320,350",
    // path: "Enthusiast.mp3",
    path: "./tracks/Buju-BNXN-In-My-Mind-(JustNaija.com).mp3",
  },
  {
    name: "Davido",
    artist: "In The Garden",
    image: "https://t2.genius.com/unsafe/340x340/https%3A%2F%2Fimages.genius.com%2Faa33f1b3341820c564c8a76a727f3863.1000x1000x1.jpg",
    // path: "Enthusiast.mp3",
    path: "./tracks/Davido-IN-THE-GARDEN-Ft-Morravey-(JustNaija.com).mp3",
  },
];

function loadTrack(track_index) {
  // Clear the previous seek timer
  clearInterval(updateTimer);
  resetValues();

  // Load a new track using the src.
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  // Update details of the track
  track_art.style.backgroundImage =
    "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;

  // Set an interval of 1000 milliseconds
  // for updating the seek slider
  updateTimer = setInterval(seekUpdate, 1000);

  // Move to the next track if the current finishes playing
  // using the 'ended' event
  curr_track.addEventListener("ended", nextTrack);
}

// Function to reset all values to their default
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
function playpauseTrack() {
  // Switch between playing and pausing
  // depending on the current state
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  // Play the loaded track
  curr_track.play();
  isPlaying = true;
  track_art.classList.add("playing");

  // Replace icon with the pause icon
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  // Pause the loaded track
  track_art.classList.remove("playing");
  curr_track.pause();
  isPlaying = false;

  // Replace icon with the play icon
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  // Go back to the first track if the
  // current one is the last in the track list
  if (track_index < track_list.length - 1) track_index += 1;
  else track_index = 0;

  // Load and play the new track
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  // Go back to the last track if the
  // current one is the first in the track list
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length - 1;

  // Load and play the new track
  loadTrack(track_index);
  playTrack();
}
function seekTo() {
  // Calculate the seek position by the
  // percentage of the seek slider
  // and get the relative duration to the track
  let seekto = curr_track.duration * (seek_slider.value / 100);

  // Set the current track position to the calculated seek position
  curr_track.currentTime = seekto;
}

function seekUpdate() {
  let seekPosition = 0;

  // Check if the current track duration is a legible number
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    // Add a zero to the single digit time values
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
let volume_slider = document.querySelector(".volume_slider");

function setVolume() {
  // Set the volume according to the
  // percentage of the volume slider set
  curr_track.volume = volume_slider.value / 100;
}
const inputElement = document.getElementById("musicFile");

inputElement.addEventListener("change", playUserSelectedMusic);

function playUserSelectedMusic() {
  // To load user selected music file.
  for (let i = 0; i < this.files.length; i++) {
    const element = this.files[i];

    if (element.type !== "audio/mpeg") {
      alert("please select a valid audio file");
      return;
    }
    // Allows users to select music from user's device folder
    const audioUrl = window.URL.createObjectURL(element);
    curr_track.src = audioUrl;
    track_list.unshift({
      // Details of user's selected music
      name: element.name,
      artist: "Your Selected Artist",
      image: "Image URL",
      path: audioUrl,
    });
    loadTrack(track_index);
    playTrack();
  }
}
// Play list to accept track list
const addUserSelectedFileToPlayList = () => {
  for (const track of track_list) {
    const li = ul.appendChild(document.createElement("li"));
    li.className = "playListWrapper";
    li.innerHTML = ` 
    <div>
    <img src="${track.image}" alt="track image" />
    </div> 
    <div>
    <p>${track.name}</p>
    <p><i>${track.artist}</i></p>
    </div>`;
    li.addEventListener("click", () => {
      curr_track.src = track.path;
      track_list.unshift({
        name: track.name,
        artist: track.artist,
        image: track.image,
        path: track.path,
      });
      // To play form playlist.
      loadTrack(track_index);
      playTrack();
    });
  }
};

playListContainer.style.display = "none";

const playListIcon = document.querySelector(".playListIcon");
playListIcon.addEventListener("click", () => {
  if (playListContainer.style.display === "block") {
    playListContainer.style.display = "none";
  } else {
    playListContainer.style.display = "block";
  }
});

playListContainer.textContent = "";
const ul = playListContainer.appendChild(document.createElement("ul"));

addUserSelectedFileToPlayList();
// Load the first track in the tracklist
loadTrack(track_index);
