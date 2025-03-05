// url may change in future so make sure to check the api documentation
// https://dictionaryapi.dev/
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const sound = document.getElementById("sound");
const result = document.getElementById("result");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let input = document.getElementById("search-inp").value;
    fetch(`${url}${input}`)
        .then((response) =>
            response.json())
        .then((data) => {
            console.log(data)
            result.innerHTML = `
             <div class="word">
                <h3>${data[0].word}</h3>

                <button onclick="playSound()" >
                <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>

            <div class="explain">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>${data[0].phonetic}</p>
            </div>

            <p id="word-meaning">${data[0].meanings[0].definitions[0].definition}</p>

            <p id="word-explain"><i>${data[0].meanings[0].definitions[1].definition}</i></p>`;

            // how to play sound //is remaining here !
            // this loop the available phonetics and find the audio
            let audioSrc = data[0].phonetics.find(p => p.audio)?.audio;
            sound.setAttribute("src", audioSrc);
            // console.log(sound)
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error"> Couldn't Find The Word</h3>`;
        });
});

function playSound() {

    sound.load(); // Ensure audio is reloaded
    sound.play()
    // use to check if the audio is playing or not
        // .then(() => console.log("Playing audio..."))
        // .catch((error) => console.error("Playback error:", error));
}
