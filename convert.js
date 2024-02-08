import { Lame } from "node-lame";

const decoder = new Lame({
    output: "./rawAudio.wav",
    raw: true,
    bitwidth: 32,
    sfreq: 44.1,
    mode: "m",
}).setFile("./rawAudio.raw");

decoder
    .decode()
    .then(() => {
        console.log("decoded successfully.");
    })
    .catch((error) => {
        console.log("Error: " + error);
    });
