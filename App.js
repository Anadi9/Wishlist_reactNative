/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from './app/style/colors';
//import tempData from './tempData';
import TodoList from './app/components/TodoList';
import AddListModal from './app/components/AddListModal';
import shortid from 'shortid';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import Fire from './Fire';


class App extends React.Component {

  wishCard = []

  state = {
    addTodoVisible: false,
    wish: '',
    lists: [],
    loading: false,
  };

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  renderList = item => {
    return <TodoList item={item} updateList={this.updateList} />;
  };

  addList = async (list) => {
    this.wishCard.push({ lists: [...this.state.lists, { ...list, id: shortid.generate(), todos: [] }] });
    await AsyncStorage.setItem('mywish', JSON.stringify(this.wishCard));
    this.setState({ lists: [...this.state.lists, { ...list, id: shortid.generate(), todos: [] }] });
    console.log(await AsyncStorage.getItem('mywish'));
  };

  updateList = list => {
    this.setState({
      lists: this.state.lists.map(item => {
        return item.id === list.id ? list : item;
      }),
    });
  };

  async componentDidMount() {
    
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.blue} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.black} />
        <Modal animationType="slide" visible={this.state.addTodoVisible} onRequestClose={() => this.toggleAddTodoModal()} >
          <AddListModal closeModal={() => this.toggleAddTodoModal()} addList={this.addList} />
        </Modal>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.divider} />
          <Text style={styles.wish}>
            Wish <Text style={styles.list}>List</Text>
          </Text>
          <View style={styles.divider} />
        </View>
        <View style={{ height: 275 }}>
          <FlatList data={this.state.lists} keyExtractor={item => item.name} horizontal={true} showsHorizontalScrollIndicator={false} renderItem={({ item }) => this.renderList(item)} keyboardShouldPersistTaps="always" />
        </View>
        <View style={{ marginVertical: 40 }}>
          <TouchableOpacity style={styles.addlist} onPress={() => this.toggleAddTodoModal()}>
            <Icon name="plus" size={20} color={colors.lightblue} />
          </TouchableOpacity>
          <Text style={styles.add}>Add List</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: colors.lightblue,
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  wish: {
    margin: 20,
    fontSize: 30,
    fontWeight: '300',
    color: colors.white,
  },
  list: {
    fontWeight: 'bold',
    color: colors.lightblue,
  },
  addlist: {
    borderWidth: 2,
    borderColor: colors.lightblue,
    borderRadius: 450,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    color: colors.blue,
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
  },
});

export default App;
