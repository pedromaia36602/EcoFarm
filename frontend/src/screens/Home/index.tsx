import { LinearGradient } from "expo-linear-gradient";
import { BellRinging, CaretDown, MapPin } from "phosphor-react-native";
import { StyleSheet, Text, View } from "react-native";

export function Home() {
  return (
    <LinearGradient
      colors={["#292A4E", "#715C77", "#C75C2E"]}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <MapPin color="#fff" size={25} />
            <Text style={styles.headerLeftText}>Iaciara</Text>
            <CaretDown color ="#fff" size={25} />
          </View>
          <BellRinging color ="#fff" size={25} />
          </View>
        <View style={styles.info}>
          <Text>Bom dia!</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 40, 
    paddingHorizontal: 35,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerLeftText: {
    color:"#fff",
    fontSize: 18,
    fontWeight: "600",
  }
});