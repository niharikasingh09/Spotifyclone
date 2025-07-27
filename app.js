console.log("Welcome to Spotify");
let songIndex = 0;
//initializing the variables
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "Aankhon se Batana- Album song(feat.Dikshant)",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Alag Aasmaan-Song by Anuv Jain",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpeg",
  },
  {
    songName: "Night Changes- Album (feat.One Direction ",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpeg",
  },
  {
    songName:
      "Rabba -Heropanti (feat. Kausar Munir,Mohit Chauhan,and Sajid Wajid)",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "One-Love - Album Song (feat. Blue) ",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpeg",
  },
  {
    songName:
      "Gun Gun Guna- Agneepath (feat.Ajay-Atul,Sunidhi Chauhan,and Udit Narayan)",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "Suniyan-Suniyan- Album song (feat.Juss and MIxsingh) ",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "Laagi lagan Shankara - Album song (feat. Hansraj Raghuvanshi) ",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "Finding her - Album song (feat.Kushagra,Saaheal,Bharath) ",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpeg",
  },
  {
    songName:
      "Main Hoon Saath Tere- Shaadi mein zaroor aana(feat.Arijit Singh)",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
  {
    songName: "Co2 - Album song (feat.Prateek Kuhad) ",
    filePath: "songs/11.mp3",
    coverPath: "covers/11.jpg",
  },
];
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  element
    .getElementsByClassName("songItemPlay")[0]
    .setAttribute("data-index", i);
});

// audioElement.play
document.getElementById("next").addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  playSong(songIndex);
});

document.getElementById("previous").addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playSong(songIndex);
});

//play pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }
});
//listen to events
audioElement.addEventListener("timeupdate", () => {
  //seekbar update
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);

  myProgressBar.value = progress;
});
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

let songItemContainer = document.getElementById("songItemContainer");

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();

      let songIndex = parseInt(e.target.getAttribute("data-index"));
      audioElement.src = songs[songIndex].filePath;
      audioElement.currentTime = 0;
      audioElement.play();

      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");

      document.querySelector(".songInfo").innerText = songs[songIndex].songName;
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
    });
  }
);
function playSong(index) {
  audioElement.src = songs[index].filePath;
  audioElement.currentTime = 0;
  audioElement.play();

  document.querySelector(".songInfo").innerText = songs[index].songName;
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");

  makeAllPlays();
  let miniPlay = document.querySelector(`.songItemPlay[data-index="${index}"]`);
  if (miniPlay) {
    miniPlay.classList.remove("fa-circle-play");
    miniPlay.classList.add("fa-circle-pause");
  }
}
