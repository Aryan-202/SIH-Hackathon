import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function AboutScreen() {
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText type="title">About Us</ThemedText>
      <ThemedText>Welcome to the About Us page!</ThemedText>
    </ThemedView>
  );
}
