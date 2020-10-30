/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../style/colors';

export default class TodoModal extends Component {
    state = {
        newTodo: '',
    };

    toggleTodoCompleted = index => {
        let list = this.props.item;
        list.todos[index].completed = !list.todos[index].completed;

        this.props.updateList(list);
    };

    addTodo = () => {
        let list = this.props.item;
        list.todos.push({ title: this.state.newTodo, completed: false });

        this.props.updateList(list);
        this.setState({ newTodo: '' });

        Keyboard.dismiss();
    };

    renderTodo = (todo, index) => {
        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
                    <Icon name={todo.completed ? 'checksquare' : 'closesquare'} size={24} color={todo.completed ? colors.lightgreen : colors.red} style={{ width: 32 }} />
                </TouchableOpacity>
                <Text style={[styles.todo, { textDecorationLine: todo.completed? 'line-through' : 'none', color: todo.completed ? colors.grey : colors.white }]}>{todo.title}</Text>
            </View>
        );
    };

    render() {

        const list = this.props.item;

        const taskCount = list.todos.length;
        const completedCount = list.todos.filter(todo => todo.completed === true).length;

        return (
            <View style={styles.container}>
                <TouchableOpacity style={{ position: 'absolute', top: 60, right: 30, zIndex: 10 }} onPress={this.props.closeModal}>
                    <Icon name="close" size={25} color={colors.white} />
                </TouchableOpacity>

                <View style={[styles.section, styles.header, {borderBottomColor: list.color}]}>
                    <View>
                        <Text style={[styles.title, {color: list.color}]}>{list.name}</Text>
                        <Text style={styles.taskCount}>{completedCount} of {taskCount} tasks completed.</Text>
                    </View>
                </View>

                <View style={[styles.section, { flex: 3 }]}>
                    <FlatList data={list.todos} renderItem={({item, index}) => this.renderTodo(item, index)} keyExtractor={(_, index) => index.toString()} contentContainerStyle={{paddingHorizontal: 30, paddingVertical: 60}} showsVerticalScrollIndicator={false} />
                </View>

                <View style={[styles.section, styles.footer]}>
                        <TextInput style={[styles.input, { borderColor: list.color }]} onChangeText={text => this.setState({ newTodo: text })} value={this.state.newTodo} />
                    <TouchableOpacity style={[styles.addTodo, { backgroundColor: list.color }]} onPress={() => this.addTodo()}>
                        <Icon name="plus" size={16} color={colors.white} />
                    </TouchableOpacity>
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
    section: {
        flex: 1,
        alignSelf: 'stretch',
    },
    header: {
        justifyContent: 'flex-end',
        marginLeft: 64,
        borderBottomWidth: 3,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colors.grey,
        fontWeight: 'bold',
    },
    footer: {
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 48,
        color: colors.white,
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 8,
        paddingHorizontal: 8,
    },
    addTodo: {
        borderRadius: 5,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    todoContainer: {
        paddingVertical: 16,
        color: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
    },
    todo: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    }
});
