import dotenv from 'dotenv';

dotenv.config();

const environment = {
    msSpeechApi: {
        key: `${process.env.MS_SPEECH_API_KEY}`,
        region: `${process.env.MS_SPEECH_API_REGION}`,
    },
};

export default environment;
