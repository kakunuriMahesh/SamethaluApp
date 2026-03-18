import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '../theme/colors';

const TermsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>
      <Text style={styles.content}>
        {/* Add your terms and conditions content here */}
        Welcome to Telugu Samethalu. By using our app, you agree to the following terms...
      </Text>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.content}>
        {/* Add your privacy policy content here */}
        We value your privacy. This app collects minimal data...
      </Text>
      {/* Add more sections as needed */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 20,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
  },
});

export default TermsScreen;