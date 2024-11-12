import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import environment from './environment';

const speechConfig = sdk.SpeechConfig.fromSubscription(environment.msSpeechApi.key, environment.msSpeechApi.region);
const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();

// The language of the voice that speaks.
speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";

// Create the speech synthesizer.
const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

synthesizer.speakTextAsync(
    "Synthesizing directly to speaker output.",
    result => {
        if (result) {
            synthesizer.close();
            return result.audioData;
        }
    },
    error => {
        console.log(error);
        synthesizer.close();
    });
