let currentSong = new Audio();

async function getSongs() {
  return ["Aaj Ki Raat - Copy.mp3", "Out of Time - Copy.mp3","Out of Time.mp3","pakistan.mp3"];
}

let audio = new Audio();

const playMusic = (track, pause = false) => {
  currentSong.src = "songs/" + track; // ✅ Fixed: no leading slash
  if (!pause) {
    currentSong.play();
    play.src = "pause.svg";
  }

  document.querySelector(".songinfo").innerHTML = decodeURI(track);
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};

async function main() {
  let songs = await getSongs();
  playMusic(songs[0], true);

  let songUL = document.querySelector(".songList ul");
  for (const song of songs) {
    songUL.innerHTML += `
      <li>
        <img class="invert" src="music.svg" alt="">
        <div class="info">
          <div style="width:91px">${song.replaceAll("%20", " ")}</div>
          <div style="width:91px">Anmol</div>
        </div>
        <div class="playnow">
          <span>Play now</span>
          <img class="invert" src="play.svg" alt="">
        </div>
      </li>`;
  }

  // Add click listeners to each song
  Array.from(document.querySelectorAll(".songList li")).forEach(e => {
    e.addEventListener("click", () => {
      const songName = e.querySelector(".info div").innerHTML.trim();
      playMusic(songName);
    });
  });

  // Play/Pause button
  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "pause.svg";
    } else {
      currentSong.pause();
      play.src = "play.svg";
    }
  });

  // Time update display
  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML =
      `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
    document.querySelector(".circle").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  // Seekbar click event
  document.querySelector(".seekbar").addEventListener("click", e => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });
}

function secondsToMinutesSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

//Add an event listener for hamburger
document.querySelector(".hamburger").addEventListener("click",()=>{
  document.querySelector(".left").style.left = "0"
})
// Add an event listener for close button
document.querySelector(".close").addEventListener("click",()=>{
  document.querySelector(".left").style.left = "-120%"
})
main();
