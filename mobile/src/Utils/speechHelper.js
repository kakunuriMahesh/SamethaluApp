import * as Speech from "expo-speech";

export const speakText = (text, lang = "en-US", rate = 0.9) => {
  Speech.speak(text, {
    language: lang,
    rate: rate,
    pitch: 1.0,
  });
};

export const stopSpeech = () => {
  Speech.stop();
};