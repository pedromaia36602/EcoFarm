import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default function App() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button title="Perfil" onPress={() => router.push('/perfil')} />
      <Button title="Dados do solo" onPress={() => router.push('/dados-do-solo')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
    padding: 20,
  },
});
