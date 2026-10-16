import { Stack, router } from "expo-router";
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("jogos.db");

db.execSync(`
    CREATE TABLE IF NOT EXISTS jogo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome VARCHAR(255),
        plataforma VARCHAR(255),
        horas INTEGER
  );
`);

function listar() {
  return db.getAllSync("SELECT * FROM jogo ORDER BY id DESC");
}

function salvar(nome, plataforma, horas) {
  db.runSync("INSERT INTO jogo (nome, plataforma, horas) VALUES (?, ?, ?)", [nome, plataforma, horas]);
}

function excluir(codigo) {
  db.runSync("DELETE FROM jogo WHERE id = ?", [codigo]);
}

function edita(nome, plataforma, horas, id) {
  db.runSync("UPDATE jogo SET nome = ?, plataforma = ?, horas = ? WHERE id = ?", [nome, plataforma, horas, id]);
}


export default function App() {

  const [nome, setNome] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [horas, setHoras] = useState("");
  const [lista, setLista] = useState([]);
  const [idEditando, setIdEditando] = useState(0);


  function carregar() {
    setLista(listar());
  }

  function guardarOuEditar() {
    if (idEditando === 0) {
      salvar(nome, plataforma, horas);
    } else {
      edita(nome, plataforma, horas, idEditando);
    }
    setNome("");
    setPlataforma("");
    setHoras("");
    setIdEditando(0);
    carregar();
  }

  function remover(codigo) {
    excluir(codigo);
    carregar();
  }

  function editar(jogo) {
    setIdEditando(jogo.id);
    setNome(jogo.nome);
    setPlataforma(jogo.plataforma);
    setHoras(String(jogo.horas));
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <Stack.Screen options={{ title: "App Jogos" }} />
      <Text style={styles.titulo}>Cadastro de Jogos</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome do jogo"
        placeholderTextColor="#555"
      />
      <TextInput
        style={styles.input}
        value={plataforma}
        onChangeText={setPlataforma}
        placeholder="Plataforma"
        placeholderTextColor="#555"
      />
      <TextInput
        style={styles.input}
        value={horas}
        onChangeText={setHoras}
        placeholder="Horas jogadas..."
        placeholderTextColor="#555"
      />

      <View style={styles.botao}>
        <Button title="Salvar" color="#000000" onPress={guardarOuEditar} />
      </View>

      <FlatList
        style={styles.lista}
        data={lista}
        renderItem={({ item }) => (
          <View style={styles.caixaLista}>
            <View>
              <Text style={styles.item}>Nome: {item.nome}</Text>
              <Text style={styles.item}>Plataforma: {item.plataforma}</Text>
              <Text style={styles.item}>Horas jogadas: {item.horas}</Text>
            </View>
            <View>
              <Button title="Editar" color="#000000" onPress={() => editar(item)} />
              <Button title="Excluir" color="#000000" onPress={() => remover(item.id)} />
            </View>
          </View>)
        }
      />

      < Button title="VOLTAR" onPress={() => router.back()} />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: "flex-start",
    gap: 10
  },

  titulo: {
    fontWeight: "bold",
    fontSize: 25
  },

  input: {
    borderWidth: 1,
    borderColor: "#D9DDE3",
    borderRadius: 12,
    width: 300,
    padding: 12,
    fontSize: 16,
    color: "#111827",
    marginBottom: 12,
  },

  caixaLista: {
    backgroundColor: "#ffffff",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 5,
    borderWidth: 1,
    borderColor: "#000000",
    marginBottom: 8
  },

  botao: {
    backgroundColor: "#d5f2f3",
    borderRadius: 15,
    width: 150,
    borderColor: "#000000",
    borderWidth: 1

  },

  lista: {
    padding: 10,
  }
});
