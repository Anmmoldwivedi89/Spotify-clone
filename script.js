

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
const playMusic = (track)=> {
    let audio = new Audio("/songs/" + track)
    currentSong.src = "/songs/" + track
    currentSong.play()
}

// Get the  list of all the songs
async function main() {
    


// Get the list of all the songs

    let songs = await getSongs()
    console.log(songs)
    
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
        play.src = "pause.svg"
    }
    else{
        currentSong.pause()
        play.src = "play.svg"

    }
})

}


main();
