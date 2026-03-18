import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { speakText, stopSpeech } from '../Utils/speechHelper';
import { COLORS } from '../theme/colors';

export default function SpeakTestScreen(textData) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeechToggle = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      speakText(textData.textToSpeak, textData.language);
      setIsSpeaking(true);
    }
  };

  const handleStop = () => {
    stopSpeech();
    setIsSpeaking(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.iconButton, isSpeaking && styles.iconButtonActive]}
        onPress={handleSpeechToggle}
      >
        <Ionicons 
          name={isSpeaking ? "pause-circle" : "play-circle"}
          size={32} 
          color={isSpeaking ? COLORS.gold : COLORS.textSecondary} 
        />
      </TouchableOpacity>

      {isSpeaking && (
        <TouchableOpacity 
          style={[styles.iconButton, styles.stopButton]}
          onPress={handleStop}
        >
          <Ionicons 
            name="stop-circle"
            size={32} 
            color="#ef4444" 
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginTop: 16,
  },
  iconButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonActive: {
    backgroundColor: 'rgba(212, 160, 23, 0.1)',
    borderColor: COLORS.gold,
  },
  stopButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: '#ef4444',
  },
});