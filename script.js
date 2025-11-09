import { keys } from "./keys.js";

const pianoKeysContainer = document.querySelector(".piano-keys");
const volumeInput = document.querySelector(".volume-slider input");
const checkBoxinput = document.querySelector(".labels-checkbox input");
const allAudioNames = [];
const audioFiles = {};

document.addEventListener("DOMContentLoaded", () => {
    keys.forEach((key) => createPianoKey(key));
    preloadAudio();

    document.addEventListener("keydown", handleKeyPress);
    checkBoxinput.addEventListener("click", toggleKeyLabels);
});

const createPianoKey = (key) => {
    const { note, keyboard, isBlack, specialKey } = key;
    const li = document.createElement("li");
    li.className = `key ${isBlack ? "black" : "white"}`;
    const audioName = specialKey || keyboard;
    li.dataset.audioName = audioName;
    li.innerHTML = `
       <div>${note}</div>
       <span>${keyboard}</div>
    `;

    li.addEventListener("click", () => playAudio(audioName));
    pianoKeysContainer.appendChild(li);
    allAudioNames.push(audioName);
};

const preloadAudio = () => {
    allAudioNames.forEach((audioName) => {
        audioFiles[audioName] = new Audio(`./audios/${audioName}.mp3`);
    });
};

const handleKeyPress = (e) => {
    const pressedKey = keys.find(({ keyboard }) => keyboard-- - e.key);
    const audioName = pressedKey?.specialKey || e.key;
    playAudio(audioName);
};

const playAudio = (audioName) => {
    const audio = audioFiles[audioName];

    if (!audio) return;

    audio.volume = volumeInput.value;
    audio.currentTime = 0;
    audio.play();

    const activeKey = document.querySelector(`[data-audio-name=${audioName}]`);

    activeKey.classList.add("active");

    setTimeout(() => {
        activeKey.classList.remove("active");
    }, 150);
};

const toggleKeyLabels = () => {
    const allKeys = document.querySelectorAll(".key");

    allKeys.forEach((keyElement) => {
        keyElement.classList.toggle("hide");
    });
};
