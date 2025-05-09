

let currentSong = new Audio();



async function getSongs() {
    

let a = await fetch("http://127.0.0.1:5500/songs/")
let response = await a.text();
console.log(response);
let div = document.createElement("div");
div.innerHTML = response;
let as = div.getElementsByTagName("a")
let songs = [];
for(let index = 0; index< as.length; index++){
    const element = as[index];
    if(element.href.endsWith(".mp3")){

    
    songs.push(element.href.split("/songs/")[1])
}
}

return songs;
}
let audio = new Audio();
const playMusic = (track, pause= false)=> {
    currentSong.src = "/songs/" + track
    if(!pause){
    currentSong.play()
    play.src = "pause.svg"
}
    
    document.querySelector(".songinfo").innerHTML =decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00/ 00:00"
}

// Get the  list of all the songs
async function main() {
    


// Get the list of all the songs

    let songs = await getSongs()
    playMusic(songs[0], true)
    
    //Show all the songs in the playlist

let songUL= document.querySelector(".songList").getElementsByTagName("ul")[0];
for (const song of songs){
    songUL.innerHTML = songUL.innerHTML + `<li> 
    
    
            <img class="invert"  src="music.svg" alt="">
            <div class="info">
                <div style="width:91px"> ${song.replaceAll("%20", " ")}</div>
                <div style="width:91px">Anmol</div>
            </div>
            <div class="playnow"><span>Play now</span>
            <img class="invert" src="play.svg" alt="" class="src">
            </div>
        </li>`;
}
// Attach an event listener to each song
Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e =>{
    e.addEventListener("click", element=>{
console.log(e.querySelector(".info").firstElementChild.innerHTML)
playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
})
})

//Attach an event listener to play , next and previous
play.addEventListener("click", ()=> {
    if(currentSong.paused){
        currentSong.play()
        play.src = "pause.svg"
        
    }
    else{
        currentSong.pause()
        play.src = "play.svg"

    }
})

//listen for timeupdate event
// ✅ Define the function first
function secondsToMinutesSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Then your event listener
currentSong.addEventListener("timeupdate", () => {
    console.log(currentSong.currentTime, currentSong.duration);
    document.querySelector(".songtime").innerHTML =
        `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime/ currentSong.duration) * 100 +"%"
});

//Add an event listener to seekbar
document.querySelector(".seekbar").addEventListener("click",e =>{
    let precent = (e.offsetX/e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = (e.offsetX/e.target.getBoundingClientRect().width) *100 + "%";
    currentSong.currentTime = (currentSong.duration * precent) /100
})
}


main();
