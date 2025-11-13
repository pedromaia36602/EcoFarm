import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit"; // Importe LineChart
import { SafeAreaView } from "react-native-safe-area-context";

// === Interface do Registro ===
interface Registro {
  id: number;
  horario: string;
  umidade: number;
  bomba_acionada: number;
}

export default function Monitor() {
  const [dados, setDados] = useState<Registro[]>([]);
  const [carregando, setCarregando] = useState(false);

  // Dados para o PieChart
  const molhado = dados.filter(d => d.umidade < 300).length;
  const umido = dados.filter(d => d.umidade >= 300 && d.umidade < 600).length;
  const seco = dados.filter(d => d.umidade >= 600).length;

  const dataPie = [
    { name: "Seco", population: seco, color: "#ff6b6b", legendFontColor: "#333", legendFontSize: 14 },
    { name: "Úmido", population: umido, color: "#feca57", legendFontColor: "#333", legendFontSize: 14 },
    { name: "Molhado", population: molhado, color: "#1dd1a1", legendFontColor: "#333", legendFontSize: 14 },
  ];

  // Dados para o LineChart
  const labelsLine = dados.slice(0, 7).map(d => { // Últimos 7 registros para o gráfico
    const time = new Date(d.horario);
    return `${time.getHours()}:${time.getMinutes()}`;
  }).reverse(); // Reverte para mostrar do mais antigo para o mais recente

  const dataLine = dados.slice(0, 7).map(d => d.umidade).reverse(); // Umidade dos últimos 7 registros

  const dataLineChart = {
    labels: labelsLine,
    datasets: [
      {
        data: dataLine,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Cor da linha
        strokeWidth: 2 // Espessura da linha
      }
    ],
    legend: ["Umidade do Solo"] // Legenda do gráfico de linha
  };


  // === ALTERE AQUI o IP do seu PC que roda o Flask ===
  //const API_URL = "http://10.182.180.62:5000/dados"; 
  const API_URL = "http://192.168.15.30:5000/dados";

  // Função para buscar dados
  async function carregarDados() {
    try {
      setCarregando(true);
      const response = await axios.get<Registro[]>(API_URL);
      console.log("Dados recebidos do servidor:", response.data);

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

      {/* Gráfico de Pizza */}
      <Text style={estilos.subTitulo}>Situação Atual da Umidade</Text>
      <PieChart
        data={dataPie}
        width={Dimensions.get("window").width - 40}
        height={200}
        chartConfig={{
          color: () => `rgba(0, 0, 0, 0.5)`,
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        absolute
      />

      {/* Gráfico de Linha */}
      <Text style={estilos.subTitulo}>Umidade ao Longo do Tempo</Text>
      <LineChart
        data={dataLineChart}
        width={Dimensions.get("window").width - 40} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
      
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
  subTitulo: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginTop: 20, marginBottom: 10 },
  card: { backgroundColor: "white", padding: 15, borderRadius: 10, marginBottom: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 5, elevation: 2 },
  texto: { fontSize: 16 },
  label: { fontWeight: "bold" },
});
