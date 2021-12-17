import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, StatusBar, Text, Modal, TouchableOpacity, Alert } from 'react-native';
import { BoardRepository, Board } from '../../notTrello/components/index';
import { colors } from '../../notTrello/constants';
import useAuth from '../../hooks/useAuth';
import { TextInput } from 'react-native-gesture-handler';
import { db } from '../../firebase';
import { onSnapshot, collection, addDoc } from "firebase/firestore";
import dummy from '../../notTrello/assets/dummyData';

const fetchTable = async () => {
  unsub =
    onSnapshot(collection(db, "tasks"),
      snapshot => {
        console.log(
          snapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
        );
      });
};
fetchTable();

const boardRepository = new BoardRepository(dummy);

export default function HomeScreen() {

  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(null);
  const [taskName, setTaskName] = useState(null);
  const [description, setDescription] = useState(null);
  const [table, setTable] = useState([]);
  const { user } = useAuth();
  const { logout } = useAuth();

  const incompleteForm = !name;

  const docRef = () => {
    const currentQuizId = Math.floor(900000 + Math.random() * 9000).toString();

    addDoc(collection(db, "tasks"), {
      name: name,
      id: user.uid + currentQuizId,
      rows: [{
        id: currentQuizId,
        name: taskName,
        description: description,
      }],
    })
      .then(() => Alert.alert('Done', 'successfully added'))
      .catch((error) => {
        console.log(error);
      })
    console.log("Document written with ID: ", user.uid);
  }

  useEffect(() => {
    let unsub;
    const fetchTable = async () => {
      unsub =
        onSnapshot(collection(db, "tasks"),
          snapshot => {
            setTable(
              snapshot.docs
                // .filter(doc => doc.id === user.uid)
                .map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                }))
            );
          });
    };
    fetchTable();
    return unsub;
  }, []);

  const finalData = table;
  let searchCashString =
    (
      user.uid === '' ? 'zero' : user.uid
    )
  const filterCashData = finalData.filter(finalData => finalData.id.includes(searchCashString));
  console.log(JSON.stringify(filterCashData))
  const boardsData = filterCashData;

  // const boardRepository = new BoardRepository(boardsData);
  // const boardRepository = new BoardRepository(dummy);

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={colors.themeBackground} barStyle='light-content' />
      <View>
        <Board
          boardRepository={boardRepository}
          open={() => { }}
          onDragEnd={() => { }}
          isWithCountBadge={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={() => setModalVisible(true)} >
          <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.loginButton} onPress={() => setModalVisible(true)} >
          <Text style={styles.buttonText}>Add List</Text>
        </TouchableOpacity> */}
      </View>
      <TouchableOpacity
        // style={[styles.loginButton, { marginTop: 40 }]}
        onPress={() => logout()} >
        {/* <Text style={styles.buttonText}>Logout</Text> */}
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.textInputContainer}>
            <TextInput
              value={name}
              placeholder='Enter column name'
              onChangeText={setName}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              value={taskName}
              placeholder='Enter task name'
              onChangeText={setTaskName}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              value={description}
              placeholder='Enter Description'
              onChangeText={setDescription}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <TouchableOpacity
              disabled={incompleteForm}
              style={[styles.loginButton, incompleteForm ? { backgroundColor: 'grey' } : { backgroundColor: colors.themePink }]}
              onPress={() => docRef() || setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.themeBackground,
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  loginButton: {
    backgroundColor: colors.themePink,
    alignSelf: 'center',
    width: '40%',
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: colors.themeBackground
  },
  textInputContainer: {
    padding: 10,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12
  },
});
