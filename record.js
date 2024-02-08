import { createWriteStream, existsSync, mkdirSync } from "fs";
import portAudio, { AudioIO, SampleFormat16Bit } from "naudiodon";
import { v4 as uuidv4 } from "uuid";

import { convertRawToWav } from "./lib/wav.js";

// console.log(portAudio.getDevices());

// Create an instance of AudioIO with inOptions (defaults are as below), which will return a ReadableStream
var ai = new AudioIO({
    inOptions: {
        channelCount: 2,
        sampleFormat: SampleFormat16Bit,
        sampleRate: 44100,
        deviceId: -1, // Use -1 or omit the deviceId to select the default device
        closeOnError: false, // Close the stream if an audio error is detected, if set false then just log the error
    },
});

// Create a write stream to write out to a raw audio file
const fileName = uuidv4();

if (!existsSync(".audio")) {
    mkdirSync(".audio");
}
var ws = createWriteStream(`.audio/${fileName}.raw`);

//Start streaming
ai.pipe(ws);
ai.start();

process.on("SIGINT", async () => {
    console.log("Saving recording...");
    ai.quit();
    console.log("Recording saved.");

    console.log("Converting to WAV...");
    await convertRawToWav(`.audio/${fileName}.raw`, `.audio/${fileName}.wav`);
    console.log("Conversion complete.");

    // Call transcribe api
    console.log("Transcribing...");
    const response = await fetch(
        `http://localhost:5000/transcribe?a=${fileName}`
    );
    const transcription = await response.json();
    console.log(transcription);
});
