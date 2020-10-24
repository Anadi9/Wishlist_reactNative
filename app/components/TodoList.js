/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from './../style/colors';

const TodoList = ({item}) => {

    const completedCount = item.todos.filter(todo => todo.completed).length;
    const remainingCount = item.todos.length = completedCount;

    return (
        <View style={[styles.listContainer, {backgroundColor: item.color}]}>
            <Text style={styles.listTitle} numberOfLines={1}>{item.name}</Text>

            <View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.count}>{completedCount}</Text>
                  <Text style={styles.subtitle}>Reamaining</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.count}>{remainingCount}</Text>
                  <Text style={styles.subtitle}>Completed</Text>
                </View>
            </View>
        </View>
    );
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
