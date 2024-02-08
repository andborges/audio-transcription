import { Lame } from "node-lame";
import wavefile from "wavefile";
import { readFileSync } from "fs";

export async function convertRawToWav(rawAudioFilename, wavAudioFilename) {
    const decoder = new Lame({
        output: wavAudioFilename,
        raw: true,
        bitwidth: 32,
        sfreq: 44.1,
        mode: "m",
    }).setFile(rawAudioFilename);

    await decoder.decode();
}

export function loadWavAudioData(wavAudioFilename) {
    const buffer = readFileSync(wavAudioFilename);

    const wav = new wavefile.WaveFile(buffer);
    wav.toBitDepth("32f"); // Pipeline expects input as a Float32Array
    wav.toSampleRate(16000); // Whisper expects audio with a sampling rate of 16000

    let audioData = wav.getSamples();
    if (Array.isArray(audioData)) {
        if (audioData.length > 1) {
            const SCALING_FACTOR = Math.sqrt(2);

            // Merge channels (into first channel to save memory)
            for (let i = 0; i < audioData[0].length; ++i) {
                audioData[0][i] =
                    (SCALING_FACTOR * (audioData[0][i] + audioData[1][i])) / 2;
            }
        }

        // Select first channel
        audioData = audioData[0];
    }

    return audioData;
}
