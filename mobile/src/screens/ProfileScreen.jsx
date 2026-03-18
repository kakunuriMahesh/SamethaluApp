import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { COLORS } from '../theme/colors';

const ProfileScreen = ({ navigation }) => {
  const appVersion = Constants.manifest?.version || '1.0.0';

  const handlePrivacyPolicy = () => {
    // Replace with your actual privacy policy URL
    Linking.openURL('https://your-privacy-policy-url.com');
  };

  const handleTermsConditions = () => {
    // Replace with your actual terms & conditions URL
    Linking.openURL('https://your-terms-conditions-url.com');
  };

  const options = [
    {
      icon: 'shield-checkmark-outline',
      title: 'Privacy Policy',
      desc: 'Learn about how we protect your data',
      onPress: handlePrivacyPolicy,
    },
    {
      icon: 'document-text-outline',
      title: 'Terms & Conditions',
      desc: 'Read our terms of service',
      onPress: handleTermsConditions,
    },
    // Add more options here if needed
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.versionContainer}>
        <Ionicons name="information-circle" size={24} color={COLORS.gold} />
        <Text style={styles.versionText}>App Version: {appVersion}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity key={index} style={styles.option} onPress={option.onPress}>
            <Ionicons name={option.icon} size={24} color={COLORS.gold} />
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDesc}>{option.desc}</Text>
            </View>
            <Ionicons name="arrow-forward" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  versionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.bgCard,
    margin: 20,
    borderRadius: 10,
    // color:'#fff',
  },
  versionText: {
    fontSize: 16,
    // color: COLORS.text,
    color:'#fff',
    marginLeft: 10,
  },
  optionsContainer: {
    paddingHorizontal: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.bgCard,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionContent: {
    flex: 1,
    marginLeft: 15,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    // color: COLORS.text,
    color:'#fff',
  },
  optionDesc: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 2,
  },
});

export default ProfileScreen;