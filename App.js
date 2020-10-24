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
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from './app/style/colors';
import tempData from './tempData';
import TodoList from './app/components/TodoList';


const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.lightblue} />
      <View style={{flexDirection:'row'}}>
        <View style={styles.divider} />
        <Text style={styles.wish}>
           Wish <Text style={styles.list}>List</Text>
        </Text>
        <View style={styles.divider} />
      </View>
      <View style={{ marginVertical: 20 }}>
          <TouchableOpacity style={styles.addlist}>
              <Icon name="plus" size={20} color={colors.lightblue} />
        </TouchableOpacity>
        <Text style={styles.add}>Add List</Text>
      </View>
      <View style={{height: 275}}>
        <FlatList data={tempData} keyExtractor={item => item.name} horizontal={true} showsHorizontalScrollIndicator={false} renderItem={({ item }) => <TodoList item={item} />} />
      </View>
    </View>
  );
};

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
