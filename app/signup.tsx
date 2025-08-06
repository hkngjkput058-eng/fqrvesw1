import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Mail, ArrowRight, Twitter, Instagram, Facebook, Linkedin, CircleCheck as CheckCircle, Shield, Zap, Users } from 'lucide-react-native';

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPlatform, setLoadingPlatform] = useState<string | null>(null);

  const socialPlatforms = [
    { 
      name: 'Twitter', 
      icon: Twitter, 
      color: '#1DA1F2',
      description: 'Connect your Twitter account'
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      color: '#0A66C2',
      description: 'Connect your LinkedIn profile'
    },
    { 
      name: 'Facebook', 
      icon: Facebook, 
      color: '#1877F2',
      description: 'Connect your Facebook page'
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      color: '#E4405F',
      description: 'Connect your Instagram account'
    },
  ];

  const handleSocialSignup = async (platform: string) => {
    setLoadingPlatform(platform);
    
    // Simulate OAuth flow
    setTimeout(() => {
      setLoadingPlatform(null);
      Alert.alert(
        'Account Connected!',
        `Your ${platform} account has been successfully connected. Welcome to SocialFlow!`,
        [{ 
          text: 'Get Started', 
          onPress: () => router.replace('/(tabs)') 
        }]
      );
    }, 2000);
  };

  const handleEmailSignup = async () => {
    if (!email) {
      Alert.alert('Email Required', 'Please enter your email address to continue.');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    
    // Simulate magic link sending
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Magic Link Sent!',
        `We've sent a secure login link to ${email}. Click the link in your email to complete your signup.`,
        [{ text: 'OK' }]
      );
    }, 1500);
  };

  const benefits = [
    { icon: Shield, text: 'Secure passwordless authentication' },
    { icon: Zap, text: 'Instant access to all platforms' },
    { icon: Users, text: 'Unified social media management' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <CheckCircle size={32} color="#10B981" />
              </View>
            </View>
            
            <Text style={styles.title}>Join SocialFlow</Text>
            <Text style={styles.subtitle}>
              Connect your social accounts and start managing your content like a pro
            </Text>
          </View>

          <View style={styles.benefitsContainer}>
            {benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <benefit.icon size={16} color="#10B981" />
                <Text style={styles.benefitText}>{benefit.text}</Text>
              </View>
            ))}
          </View>

          <View style={styles.signupSection}>
            <Text style={styles.sectionTitle}>Choose your preferred signup method</Text>
            
            <View style={styles.socialButtons}>
              {socialPlatforms.map((platform) => (
                <TouchableOpacity
                  key={platform.name}
                  style={[styles.socialButton, loadingPlatform === platform.name && styles.socialButtonLoading]}
                  onPress={() => handleSocialSignup(platform.name)}
                  disabled={loadingPlatform !== null}
                >
                  <View style={[styles.socialIconContainer, { backgroundColor: `${platform.color}15` }]}>
                    <platform.icon size={24} color={platform.color} />
                  </View>
                  <View style={styles.socialButtonContent}>
                    <Text style={styles.socialButtonTitle}>Continue with {platform.name}</Text>
                    <Text style={styles.socialButtonDescription}>{platform.description}</Text>
                  </View>
                  {loadingPlatform === platform.name ? (
                    <View style={styles.loadingIndicator}>
                      <Text style={styles.loadingText}>Connecting...</Text>
                    </View>
                  ) : (
                    <ArrowRight size={20} color="#64748B" />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.emailSection}>
              <Text style={styles.emailSectionTitle}>Sign up with email</Text>
              <Text style={styles.emailSectionDescription}>
                We'll send you a secure magic link - no password required
              </Text>
              
              <View style={styles.emailInputContainer}>
                <View style={styles.inputWrapper}>
                  <Mail size={20} color="#64748B" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email address"
                    placeholderTextColor="#94A3B8"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={[styles.emailButton, isLoading && styles.emailButtonDisabled]}
                onPress={handleEmailSignup}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Text style={styles.emailButtonText}>Sending Magic Link...</Text>
                ) : (
                  <>
                    <Text style={styles.emailButtonText}>Send Magic Link</Text>
                    <ArrowRight size={20} color="#FFFFFF" />
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text style={styles.loginLink} onPress={() => router.push('/login')}>
                Sign in here
              </Text>
            </Text>
            
            <Text style={styles.termsText}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>

          <View style={styles.securityNote}>
            <Shield size={16} color="#10B981" />
            <Text style={styles.securityText}>
              Your data is encrypted and secure. We never store passwords.
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  keyboardContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
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
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  benefitsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 12,
    fontWeight: '500',
  },
  signupSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
    textAlign: 'center',
  },
  socialButtons: {
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  socialButtonLoading: {
    opacity: 0.7,
  },
  socialIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  socialButtonContent: {
    flex: 1,
  },
  socialButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  socialButtonDescription: {
    fontSize: 12,
    color: '#64748B',
  },
  loadingIndicator: {
    paddingHorizontal: 12,
  },
  loadingText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    fontSize: 14,
    color: '#64748B',
    marginHorizontal: 16,
    fontWeight: '500',
  },
  emailSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  emailSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
    textAlign: 'center',
  },
  emailSectionDescription: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  emailInputContainer: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
    paddingVertical: 16,
  },
  emailButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1DA1F2',
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#1DA1F2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  emailButtonDisabled: {
    backgroundColor: '#94A3B8',
    shadowOpacity: 0,
  },
  emailButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  loginLink: {
    color: '#1DA1F2',
    fontWeight: '600',
  },
  termsText: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 20,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  securityText: {
    fontSize: 12,
    color: '#166534',
    marginLeft: 8,
    fontWeight: '500',
  },
});