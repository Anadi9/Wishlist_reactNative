/* eslint-disable prettier/prettier */
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from './../style/colors';
import TodoModal from './TodoModal';

class TodoList extends React.Component {
    state = {
        showListVisible: false,
    };

    toggleListModal() {
        this.setState({ showListVisible: !this.state.showListVisible });
    }

    render() {
        const item = this.props.item;
        
        const completedCount = item.todos.filter(todo => todo.completed === true).length;
        const remainingCount = item.todos.filter(todo => todo.completed === false).length;
        
        return (
            <View>
                <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={() => this.toggleListModal()}>
                    <TodoModal item={item} closeModal={() => this.toggleListModal()} updateList={this.props.updateList}/>
                </Modal>
            <TouchableOpacity style={[styles.listContainer, {backgroundColor: item.color}]} onPress={() => this.toggleListModal()}>
                <Text style={styles.listTitle} numberOfLines={1}>{item.name}</Text>
    
                <View>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={styles.count}>{remainingCount}</Text>
                      <Text style={styles.subtitle}>Remaining</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={styles.count}>{completedCount}</Text>
                      <Text style={styles.subtitle}>Completed</Text>
                    </View>
                </View>
            </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 30,
        paddingHorizontal: 15,
        borderRadius: 15,
        marginHorizontal: 30,
        alignItems: 'center',
        width: 200,
    },
    listTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: 18,
    },
    count: {
        fontSize: 48,
        color: colors.white,
    },
    subtitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.white,
    }
})

export default TodoList;
