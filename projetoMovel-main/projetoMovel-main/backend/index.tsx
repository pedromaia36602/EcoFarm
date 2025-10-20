import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// === Interface do Registro ===
interface Registro {
  id: number;
  horario: string;
  umidade: number;
  bomba_acionada: number;
}

export default function App() {
  const [dados, setDados] = useState<Registro[]>([]);
  const [carregando, setCarregando] = useState(false);

  // === ALTERE AQUI o IP do seu PC que roda o Flask ===
  //const API_URL = "http://10.182.180.62:5000/dados"; 
  const API_URL = "http://localhost:5000/dados";

  // Função para buscar dados
  async function carregarDados() {
    try {
      setCarregando(true);
      const response = await axios.get<Registro[]>(API_URL);
      const novosDados = response.data;

      // Verifica se houve acionamento da bomba
      if (novosDados.length > 0) {
        const ultimo = novosDados[0];
        if (ultimo.bomba_acionada) {
          Alert.alert("💧 Alerta!", "A bomba de água foi acionada!");
        }
      }

      setDados(novosDados);
      console.log("Dados recebidos:", novosDados); // debug
    } catch (error: any) {
      console.error("Erro ao buscar dados:", error.message);
    } finally {
      setCarregando(false);
    }
  }

  // Atualiza os dados ao iniciar e a cada 10s
  useEffect(() => {
    carregarDados();
    const interval = setInterval(carregarDados, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.titulo}>🌱 Monitor de Umidade do Solo</Text>
      <FlatList
        data={dados}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={carregando} onRefresh={carregarDados} />
        }
        renderItem={({ item }) => (
          <View style={estilos.card}>
            <Text style={estilos.texto}>
              <Text style={estilos.label}>Data: </Text>
              {item.horario}
            </Text>
            <Text style={estilos.texto}>
              <Text style={estilos.label}>Umidade: </Text>
              {item.umidade}
            </Text>
            <Text
              style={[
                estilos.texto,
                { color: item.bomba_acionada ? "red" : "green" },
              ]}
            >
              <Text style={estilos.label}>Bomba: </Text>
              {item.bomba_acionada ? "Ligada 💧" : "Desligada"}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// === Estilos ===
const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", paddingTop: 50, paddingHorizontal: 15 },
  titulo: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  card: { backgroundColor: "white", padding: 15, borderRadius: 10, marginBottom: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 5, elevation: 2 },
  texto: { fontSize: 16 },
  label: { fontWeight: "bold" },
});
