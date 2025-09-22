import React, { useState } from 'react';
import { Button, Image, ImageBackground, StyleSheet, Text, TextInput } from 'react-native';

const App = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    
    <ImageBackground
      source={require('../../assets/images/nature.jpeg')}
      style={styles.container}
      resizeMode="cover"
    >
      
      <Image
         source={require('../../assets/images/EcoFarm.jpg')}
         style={{ width: 200, height: 200, borderRadius: 100 }}
      />
      <Text style={styles.output}>E-mail:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={(newEmail) => setEmail(newEmail)}
      />
      <Text style={styles.output}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={(newSenha) => setSenha(newSenha)}
      />
      <Button title="Entrar" onPress={() => {
         
      }} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    alignItems: 'center'
  },
  input: {
    color: 'white',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  output: {
    color: 'white',
    fontSize: 16,
  },
  
});

export default App;