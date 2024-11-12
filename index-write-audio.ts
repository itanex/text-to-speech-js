import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import readline from 'readline';
import environment from './environment';
import logger from './logger';

const fileRootPath = 'local-cache/';

let audioFile = "YourAudioFile.wav";

const speechConfig = sdk.SpeechConfig.fromSubscription(environment.msSpeechApi.key, environment.msSpeechApi.region);
const audioConfig = sdk.AudioConfig.fromAudioFileOutput(`${fileRootPath}${audioFile}`);

// The language of the voice that speaks.
speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";

// Create the speech synthesizer.
var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter some text that you want to speak >\n> ", function (text: any) {
    rl.close();
    // Start the synthesizer and wait for a result.
    synthesizer.speakTextAsync(text,
        function (result: { reason: any; errorDetails: string; }) {
            if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                logger.info("synthesis finished.");
            } else {
                logger.error("Speech synthesis canceled, " + result.errorDetails +
                    "\nDid you set the speech resource key and region values?");
            }
            synthesizer.close();
            // synthesizer = null;
        },
        function (err: string) {
            logger.error("err - " + err);
            synthesizer.close();
            // synthesizer = null;
        });
    logger.info("Now synthesizing to: " + audioFile);
});
