import { Image } from 'expo-image';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      {/* Logo */}
      <Image
        source={require('@/assets/images/image.png')}
        style={styles.logo}
      />

      {/* Welcome Text */}
      <ThemedText type="title" style={styles.title}>
        Welcome!
      </ThemedText>
      <ThemedText type="subtitle" style={styles.tagline}>
        Your Travel Companion App
      </ThemedText>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => router.push('/explore')}>
          <Text style={styles.buttonText}>Explore</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push('/about')}>
          <Text style={styles.buttonText}>About Us</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push('/dashboard')}>
          <Text style={styles.buttonText}>Dashboard</Text>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 180,
    height: 120,
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 6,
  },
  tagline: {
    textAlign: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  buttonContainer: {
    gap: 15,
    width: '80%',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
