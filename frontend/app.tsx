import { useState } from 'react';
import {
  Appearance,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Monitor from './Monitor';

// =====================================================
// LOGIN
// =====================================================
const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // ESTADOS ADICIONADOS
  const [showReset, setShowReset] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [animal, setAnimal] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPass, setNewUserPass] = useState('');

  const handleLogin = () => {
    if (email === 'teste@mail.com' && senha === '12345') {
      onLogin(email);
    } else {
      alert('E-mail ou senha incorretos! Use teste@mail.com / 12345');
    }
  };

  const handleResetPassword = () => {
    if (animal.trim() !== '') {
      alert("Senha redefinida! Sua nova senha é: 12345");
      setShowReset(false);
    } else {
      alert("Informe o nome de um animal de estimação!");
    }
  };

  const handleRegister = () => {
    if (!newUserEmail || !newUserPass) {
      alert("Preencha todos os campos!");
      return;
    }
    alert("Usuário criado com sucesso! Agora faça login.");
    setShowRegister(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🌱 EcoFarm</Text>
      <Text style={styles.subtitle}>Acesso ao Sistema</Text>

      {/* CAMPOS NORMAIS */}
      {!showReset && !showRegister && (
        <>
          <TextInput
            placeholder="E-mail"
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Senha"
            style={styles.input}
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          {/* BOTÕES ADICIONADOS */}
          <TouchableOpacity onPress={() => { setShowReset(true); setShowRegister(false); }}>
            <Text style={{ color: '#2e7d32', marginTop: 15 }}>Esqueci a senha</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { setShowRegister(true); setShowReset(false); }}>
            <Text style={{ color: '#2e7d32', marginTop: 10 }}>Novo usuário</Text>
          </TouchableOpacity>
        </>
      )}

      {/* FORMULÁRIO ESQUECI A SENHA */}
      {showReset && (
        <View style={{ width: '90%', marginTop: 20 }}>
          <Text style={{ color: '#333', marginBottom: 10 }}>
            Para recuperar sua senha, responda:
          </Text>
          <Text style={{ marginBottom: 5 }}>🐶 Qual é o nome de um animal de estimação?</Text>

          <TextInput
            placeholder="Ex: Rex"
            style={styles.input}
            value={animal}
            onChangeText={setAnimal}
          />

          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowReset(false)}>
            <Text style={{ color: '#2e7d32', marginTop: 15 }}>Voltar</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* FORMULÁRIO NOVO USUÁRIO */}
      {showRegister && (
        <View style={{ width: '90%', marginTop: 20 }}>
          <Text style={{ color: '#333', marginBottom: 10 }}>Criar novo usuário</Text>

          <TextInput
            placeholder="Novo e-mail"
            style={styles.input}
            value={newUserEmail}
            onChangeText={setNewUserEmail}
          />

          <TextInput
            placeholder="Nova senha"
            style={styles.input}
            secureTextEntry
            value={newUserPass}
            onChangeText={setNewUserPass}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowRegister(false)}>
            <Text style={{ color: '#2e7d32', marginTop: 15 }}>Voltar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// =====================================================
// DASHBOARD (SEU CÓDIGO ORIGINAL – NÃO ALTEREI NADA)
// =====================================================
const Dashboard = ({
  email,
  onLogout,
  theme,
  setTheme,
  language,
  setLanguage,
  accessibility,
  setAccessibility,
}) => {
  const [tab, setTab] = useState('monitor');
  const [dados, setDados] = useState([]);

  const [perfil, setPerfil] = useState({
    Nome: '',
    Email: email,
    Endereco: '',
    Sitio: '',
  });

  const textos = {
    pt: { perfil: 'Perfil', config: 'Configurações', temperatura: 'Temperatura e Umidade', historico: 'Histórico Diário', sair: 'Sair', editar: 'Editar Perfil', salvar: 'Salvar Alterações', idioma: 'Idioma', tema: 'Tema', acessibilidade: 'Acessibilidade', claro: 'Claro', escuro: 'Escuro', automatico: 'Automático', ligado: 'Ligado', desligado: 'Desligado' },
    en: { perfil: 'Profile', config: 'Settings', temperatura: 'Temperature & Humidity', historico: 'Daily Summary', sair: 'Logout', editar: 'Edit Profile', salvar: 'Save Changes', idioma: 'Language', tema: 'Theme', acessibilidade: 'Accessibility', claro: 'Light', escuro: 'Dark', automatico: 'Auto', ligado: 'On', desligado: 'Off' },
    es: { perfil: 'Perfil', config: 'Configuraciones', temperatura: 'Temperatura y Humedad', historico: 'Historial Diario', sair: 'Salir', editar: 'Editar Perfil', salvar: 'Guardar Cambios', idioma: 'Idioma', tema: 'Tema', acessibilidade: 'Accesibilidad', claro: 'Claro', escuro: 'Oscuro', automatico: 'Automático', ligado: 'Activado', desligado: 'Desactivado' },
  };

  const t = textos[language];

  const cores =
    theme === 'dark'
      ? { fundo: '#1e1e1e', texto: '#fff', card: '#333', destaque: '#4caf50' }
      : { fundo: '#eef3f8', texto: '#222', card: '#fff', destaque: '#2e7d32' };

  const fonteBase = accessibility ? 20 : 15;

  const renderPerfil = () => (
    <ScrollView>
      <Text style={[styles.sectionTitle, { color: cores.destaque, fontSize: fonteBase + 4 }]}>
        👤 {t.perfil}
      </Text>

      {Object.keys(perfil).map((key) => (
        <View key={key} style={{ marginBottom: 12 }}>
          <Text style={{ color: cores.texto, fontSize: fonteBase, marginBottom: 4 }}>
            {key}
          </Text>

          <TextInput
            style={[styles.input, { backgroundColor: cores.card, color: cores.texto, fontSize: fonteBase }]}
            value={perfil[key]}
            onChangeText={(txt) => setPerfil({ ...perfil, [key]: txt })}
          />
        </View>
      ))}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: cores.destaque }]}
        onPress={() => alert('Informações salvas com sucesso!')}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: fonteBase }}>
          💾 {t.salvar}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderConfiguracoes = () => (
    <ScrollView>
      <Text style={[styles.sectionTitle, { color: cores.destaque, fontSize: fonteBase + 4 }]}>
        ⚙️ {t.config}
      </Text>

      <Text style={[styles.dataText, { color: cores.texto, fontSize: fonteBase }]}>
        {t.idioma}:
      </Text>
      <View style={styles.row}>
        {['pt', 'en', 'es'].map((lang) => (
          <TouchableOpacity
            key={lang}
            style={[styles.optionButton, { backgroundColor: language === lang ? cores.destaque : '#ccc' }]}
            onPress={() => setLanguage(lang)}
          >
            <Text style={{ color: '#fff', fontSize: fonteBase }}>
              {lang === 'pt' ? 'br' : lang === 'en' ? 'in' : 'es'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.dataText, { color: cores.texto, fontSize: fonteBase }]}>
        {t.tema}:
      </Text>
      <View style={styles.row}>
        {['light', 'dark', 'auto'].map((m) => (
          <TouchableOpacity
            key={m}
            style={[styles.optionButton, { backgroundColor: theme === m ? cores.destaque : '#ccc' }]}
            onPress={() =>
              setTheme(m === 'auto' ? Appearance.getColorScheme() || 'light' : m)
            }
          >
            <Text style={{ color: '#fff', fontSize: fonteBase }}>
              {m === 'light' ? t.claro : m === 'dark' ? t.escuro : t.automatico}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.dataText, { color: cores.texto, fontSize: fonteBase }]}>
        {t.acessibilidade}:
      </Text>
      <View style={styles.row}>
        <Text style={{ color: cores.texto, fontSize: fonteBase }}>
          {accessibility ? t.ligado : t.desligado}
        </Text>
        <Switch value={accessibility} onValueChange={setAccessibility} thumbColor={cores.destaque} />
      </View>
    </ScrollView>
  );

  return (
    <View style={[styles.dashboard, { backgroundColor: cores.fundo }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: cores.texto }]}>🌱 EcoFarm</Text>
        <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
          <Text style={{ color: cores.texto }}>🚪 {t.sair}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        {['monitor', 'perfil', 'configuracao'].map((name) => (
          <TouchableOpacity
            key={name}
            onPress={() => setTab(name)}
            style={[
              styles.tabButton,
              tab === name && { borderBottomColor: cores.destaque, borderBottomWidth: 3 },
            ]}
          >
            <Text style={{ color: cores.texto, fontSize: fonteBase }}>
              {name === 'monitor'
                ? '📈 Monitor'
                : name === 'perfil'
                ? `👤 ${t.perfil}`
                : `⚙️ ${t.config}`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {tab === 'monitor' && <Monitor />}
        {tab === 'perfil' && renderPerfil()}
        {tab === 'configuracao' && renderConfiguracoes()}
      </ScrollView>
    </View>
  );
};

// =====================================================
// APP
// =====================================================
export default function App() {
  const [logado, setLogado] = useState(false);
  const [emailUsuario, setEmailUsuario] = useState('');
  const [theme, setTheme] = useState(Appearance.getColorScheme() || 'light');
  const [language, setLanguage] = useState('pt');
  const [accessibility, setAccessibility] = useState(false);

  return logado ? (
    <Dashboard
      email={emailUsuario}
      onLogout={() => setLogado(false)}
      theme={theme}
      setTheme={setTheme}
      language={language}
      setLanguage={setLanguage}
      accessibility={accessibility}
      setAccessibility={setAccessibility}
    />
  ) : (
    <LoginScreen onLogin={(email) => { setEmailUsuario(email); setLogado(true); }} />
  );
}

// =====================================================
// ESTILOS
// =====================================================
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eef3f8' },
  logo: { fontSize: 42, fontWeight: 'bold', color: '#2e7d32' },
  subtitle: { fontSize: 18, marginBottom: 20, color: '#555' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginVertical: 6, width: '90%' },
  button: { backgroundColor: '#2e7d32', padding: 12, borderRadius: 8, width: '90%', marginTop: 20 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  dashboard: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
  title: { fontSize: 22, fontWeight: '700' },
  logoutButton: { padding: 6 },
  tabBar: { flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 1, borderColor: '#ccc' },
  tabButton: { paddingVertical: 10 },
  content: { padding: 20 },
  sectionTitle: { fontWeight: 'bold', marginVertical: 10 },
  dataCard: { padding: 10, borderRadius: 8, marginVertical: 5, elevation: 2 },
  dataText: { marginVertical: 4 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginVertical: 8 },
  optionButton: { padding: 10, borderRadius: 8 },
});
