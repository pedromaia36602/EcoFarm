import { StatusBar } from "expo-status-bar";
import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from './src/styles';

export default function App (){
    return (
    <View style={styles.container}>
    <Text style={styles.formTitle}>Login</Text>
    <TextInput style={styles.formInput}
    placeholder="Informe o e-mail"
    keyboardType="e-mail-address"
    autoCapitalize="none"
    autoComplete="email"
    />
    <TextInput style={styles.formInput}
    placeholder="Informe a senha"
    autoCapitalize="none"
    secureTextEntry
    />
    <Pressable style={styles.formButton}>
        <Text style={styles.textButton}>Logar</Text>
    </Pressable>
    <View style={styles.subContainer}>
    <Pressable style={styles.subButton}>
        <Text style={styles.subTextButton}>Esqueci a Senha</Text>
    </Pressable>
    <Pressable style={styles.subButton}>
        <Text style={styles.subTextButton}>Novo usuário</Text>
    </Pressable>
    </View>
    <StatusBar style="auto"/>
    </View>
);
}