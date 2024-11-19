import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import ModalSelector from 'react-native-modal-selector'; // Importando o ModalSelector
import { Ionicons } from '@expo/vector-icons'; // Importando o ícone da lupa
import { LinearGradient } from 'expo-linear-gradient';

// Função para gerar alunos aleatórios para uma turma específica
const generateRandomStudents = (turma, studentsList) => {
  const sortedStudents = studentsList.sort((a, b) => a.nome.localeCompare(b.nome));
  return sortedStudents.map((student, index) => ({
    matricula: (251047 + index).toString(),
    turma: turma,
    nome: student.nome,
    presente: false,
  }));
};

const RegistroPresenca = () => {
  const alunos1B = [
    { nome: 'Ana Clara Silva Ribeiro' }, { nome: 'Bianca Machado Alves' }, { nome: 'Cleiton Roberto Santos' },
    { nome: 'Gabriela Souza Costa' }, { nome: 'Lucas Pereira Silva' }, { nome: 'Mariana Alves Costa' },
    { nome: 'Fernanda Lemos Oliveira' }, { nome: 'Ricardo Santana' }, { nome: 'Patricia Gomes' },
    { nome: 'João Pedro Lima' }, { nome: 'Ana Beatriz Pereira' }, { nome: 'Carlos Henrique Rocha' }
  ];

  const alunos2A = [
    { nome: 'Rodrigo Silva Oliveira' }, { nome: 'Juliana Costa Martins' }, { nome: 'Carlos Eduardo Lima' },
    { nome: 'Marina Alves Ferreira' }, { nome: 'Ricardo Souza Mendes' }, { nome: 'Cláudia Lima Rocha' },
    { nome: 'Roberto Pereira Souza' }, { nome: 'Fernanda Oliveira Silva' }, { nome: 'Thiago Rocha Lima' },
    { nome: 'Camila Almeida Santos' }, { nome: 'Vanessa Costa Santos' }, { nome: 'Fábio Almeida Pires' }
  ];

  const alunos3C = [
    { nome: 'Paula Martins Costa' }, { nome: 'Marcelo Souza Almeida' }, { nome: 'Tiago Oliveira Silva' },
    { nome: 'Luana Pereira Ferreira' }, { nome: 'Daniela Gomes Ferreira' }, { nome: 'Eduardo Silva Rocha' },
    { nome: 'Mariana Pinto Mendes' }, { nome: 'Carlos Alberto Santana' }, { nome: 'Renata Lima Souza' },
    { nome: 'Juliana Rocha Costa' }, { nome: 'Victor Hugo Gomes' }, { nome: 'Luciana Almeida Santos' }
  ];

  const alunos1BList = generateRandomStudents('1*B', alunos1B);
  const alunos2AList = generateRandomStudents('2*A', alunos2A);
  const alunos3CList = generateRandomStudents('3*C', alunos3C);

  const [alunos, setAlunos] = useState(alunos1BList);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTurma, setSelectedTurma] = useState('1*B');

  const dataAtual = new Date().toLocaleDateString('pt-BR');

  const filteredAlunos = alunos.filter((aluno) =>
    aluno.turma === selectedTurma && aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (matricula) => {
    setAlunos((prevAlunos) =>
      prevAlunos.map((aluno) =>
        aluno.matricula === matricula ? { ...aluno, presente: !aluno.presente } : aluno
      )
    );
  };

  const handleSave = () => {
    Alert.alert('Sucesso', 'Lista salva!');
  };

  const handleTurmaChange = (turma) => {
    setSelectedTurma(turma);
    if (turma === '1*B') {
      setAlunos(alunos1BList);
    } else if (turma === '2*A') {
      setAlunos(alunos2AList);
    } else if (turma === '3*C') {
      setAlunos(alunos3CList);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
      <LinearGradient
        colors={['#080529', '#1A128F']} // Gradiente do fundo do título
        style={styles.gradientHeader}
      >
        <Text style={styles.title}>Registro de Presença</Text>
      </LinearGradient>
      </View>

      <View style={styles.selectContainer}>
        <Text style={styles.selectedText}>Selecione a turma:</Text>
        <ModalSelector
          data={[
            { key: 0, label: '1*B' },
            { key: 1, label: '2*A' },
            { key: 2, label: '3*C' },
          ]}
          initValue={selectedTurma}
          onChange={(option) => handleTurmaChange(option.label)}
        >
          <TextInput
            style={[styles.input, styles.flex1]}
            placeholder="Selecione a Turma"
            value={selectedTurma}
            editable={false}
          />
        </ModalSelector>

        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{dataAtual}</Text>
        </View>
      </View>

      {/* Barra de Pesquisa com ícone de lupa */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar aluno..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Matrícula</Text>
        <Text style={styles.tableHeaderText}>Turma</Text>
        <Text style={styles.tableHeaderText}>Nome</Text>
      </View>

      <FlatList
        data={filteredAlunos}
        keyExtractor={(item) => item.matricula}
        renderItem={({ item, index }) => (
          <View
          style={[styles.listItem, {
            backgroundColor: index % 2 === 0 ? '#D3D3D3' : '#FFFFFF', // Cor alternada para as linhas
          }]}>
          <Text style={styles.listTextMatricula}>{item.matricula}</Text>
          <Text style={styles.listTextTurma}>{item.turma}</Text>
          <Text style={styles.listTextNome}>{item.nome}</Text>
    
          {/* Envolvendo o Checkbox com uma View para adicionar borda */}
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={item.presente ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange(item.matricula)}
              color={item.presente ? 'black' : 'gray'}
              size={10} // Tamanho reduzido do checkbox
              style={{ transform: [{ scale: 0.9 }] }}
              />
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.saveButtonContainer} onPress={handleSave}>
      <LinearGradient
          colors={['#080529', '#1A128F']} // Gradiente do botão
          style={styles.saveButton}
        >
          <Text style={styles.saveButtonText}>Salvar Lista</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  gradientHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffff',
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  selectedText: {
    fontSize: 16,
    marginRight: 10,
    color: '#333',
  },
  flex1: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 6,
    width: '100%',
    backgroundColor: '#f9f9f9', // Cor de fundo mais suave
    fontSize: 16,
    color: '#333',
    textAlign: 'left', // Centraliza o texto dentro do campo
  },
  dateContainer: {
    marginLeft: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10, // Borda arredondada
    backgroundColor: '#f9f9f9', // Cor de fundo suave
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 10,
    width: '50%', // Define uma largura menor
    alignSelf: 'left', // Centraliza na tela
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1C138D',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'left',
    color: 'white',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  listTextMatricula: {
    flex: 0.4, // Diminui o espaço para a matrícula
    textAlign: 'left',
    fontSize: 16,
    paddingLeft: 10, // Adiciona um pouco de espaço à esquerda da matrícula
  },
  listTextTurma: {
    flex: 0.3, // Diminui o espaço para a turma
    textAlign: 'left',
    fontSize: 16,
    paddingLeft: 10, // Alinha o texto para a esquerda
  },
  listTextNome: {
    flex: 1, // Dá mais espaço ao nome, garantindo que ele tenha mais largura
    textAlign: 'left',
    fontSize: 16,
    paddingLeft: 10, // Garante que o nome não fique colado nas bordas
  },
  checkboxContainer: {
    borderWidth: 0.9,
    borderRadius: 0,
    padding: 0,
    borderColor: '#080527',
    backgroundColor: '#ffff',
  },
  saveButtonContainer: {
    alignItems: 'center', // Centraliza o botão na tela
    marginTop: 20,
  },
  
  saveButton: {
    width: '50%', // Reduz a largura do botão
    paddingVertical: 12, // Altura do botão
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  saveButtonText: {
    color: '#fff', // Texto branco
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'normal',  // Mudando para 'normal' para não deixar a data em negrito
  },
});

export default RegistroPresenca;
