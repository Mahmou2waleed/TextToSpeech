let message = document.getElementById("message");
let selector = document.getElementsByClassName("selector")[0];
let lsnBtn = document.getElementsByClassName("lsnBtn")[0];
let playImg = document.querySelector(".playImg");

let speech = new SpeechSynthesisUtterance();
let voices = [];
let isSpeaking = false;

function loadVoices() {
  voices = window.speechSynthesis.getVoices();
  selector.innerHTML = "";
  voices.forEach((voice, i) => {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = `${voice.name}`;
    selector.appendChild(option);
  });

}

window.speechSynthesis.onvoiceschanged = loadVoices;

lsnBtn.onclick = function () {
  if (isSpeaking) {
    window.speechSynthesis.cancel(); 
    isSpeaking = false;
    playImg.src = "https://www.svgrepo.com/show/522226/play.svg"; // Switch to play icon
  } else {
    let textMessage = message.value.trim();
    if (textMessage !== "") {
      speech.text = textMessage;
      let selectedVoice = voices[selector.value];
      speech.voice = selectedVoice;
      window.speechSynthesis.speak(speech);
      isSpeaking = true;
      playImg.src = "https://www.svgrepo.com/show/341081/stop-filled-alt.svg";
    }
  }
};

speech.onend = function () {
  isSpeaking = false;
  playImg.src = "https://www.svgrepo.com/show/522226/play.svg";
};
