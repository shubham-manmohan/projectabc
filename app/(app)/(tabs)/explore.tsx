import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  return (

    <ThemedView style={styles.titleContainer}>
      <ThemedText type="title">Account</ThemedText>
    </ThemedView>

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    flexDirection: 'row',
    gap: 8,
  },
});
