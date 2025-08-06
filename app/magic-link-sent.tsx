import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Mail, ArrowLeft, RefreshCw, CircleCheck as CheckCircle } from 'lucide-react-native';

export default function MagicLinkSentScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();

  const handleResendLink = () => {
    // Simulate resending magic link
    setTimeout(() => {
      alert('Magic link resent successfully!');
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          title: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} color="#1E293B" />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            <Mail size={48} color="#1DA1F2" />
          </View>
          <View style={styles.checkmarkContainer}>
            <CheckCircle size={24} color="#10B981" />
          </View>
        </View>

        <Text style={styles.title}>Check your email</Text>
        <Text style={styles.subtitle}>
          We've sent a secure login link to
        </Text>
        <Text style={styles.email}>{email}</Text>

        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>What's next?</Text>
          <View style={styles.instructionsList}>
            <View style={styles.instructionItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepText}>1</Text>
              </View>
              <Text style={styles.instructionText}>Check your email inbox</Text>
            </View>
            <View style={styles.instructionItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepText}>2</Text>
              </View>
              <Text style={styles.instructionText}>Click the "Sign in to SocialFlow" link</Text>
            </View>
            <View style={styles.instructionItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepText}>3</Text>
              </View>
              <Text style={styles.instructionText}>You'll be automatically signed in</Text>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.resendButton}
            onPress={handleResendLink}
          >
            <RefreshCw size={16} color="#1DA1F2" />
            <Text style={styles.resendButtonText}>Resend Link</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.demoButton}
            onPress={() => router.replace('/(tabs)')}
          >
            <Text style={styles.demoButtonText}>Continue with Demo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>Didn't receive the email?</Text>
          <Text style={styles.helpText}>
            Check your spam folder or try a different email address. The link expires in 15 minutes for security.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 32,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1DA1F2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  checkmarkContainer: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1DA1F2',
    textAlign: 'center',
    marginBottom: 32,
  },
  instructionsContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
    textAlign: 'center',
  },
  instructionsList: {
    gap: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1DA1F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  instructionText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
    lineHeight: 20,
  },
  actions: {
    width: '100%',
    gap: 12,
    marginBottom: 32,
  },
  resendButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F2FE',
    borderRadius: 12,
    paddingVertical: 14,
  },
  resendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1DA1F2',
    marginLeft: 8,
  },
  demoButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  demoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
  },
  helpSection: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FED7AA',
    width: '100%',
  },
  helpTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 4,
    textAlign: 'center',
  },
  helpText: {
    fontSize: 12,
    color: '#B45309',
    textAlign: 'center',
    lineHeight: 18,
  },
});