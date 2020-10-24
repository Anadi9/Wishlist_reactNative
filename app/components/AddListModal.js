/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import tempData from '../../tempData';
import colors from '../style/colors';

class AddListModal extends React.Component {
    backgroundColors = ['#5cd859', '#24a6d9', '#5958d9', '#8022d9', '#d159', '#d159d8', '#d85963', '#d88559']

    state = {
        name: '',
        color: this.backgroundColors[0],
    };

    renderColors() {
        return this.backgroundColors.map(color => {
            return (
                <TouchableOpacity key={color} style={[styles.colorSelect, { backgroundColor: color }]} onPress={() => this.setState({ color })} />
            );
        });
    }

    createTodo = () => {
        const { name, color } = this.state;

        const list = { name, color };

        this.props.addList(list);

        this.setState({ name: '' });
        this.props.closeModal();
    };

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <TouchableOpacity style={styles.closeBtn} onPress={this.props.closeModal}>
                   <Icon name="close" size={24} color={colors.white} />
                </TouchableOpacity>
    
                <View style={{ alignSelf: 'stretch', marginHorizontal: 32 }}>
                    <Text style={styles.title}>Create List</Text>

                    <TextInput style={styles.input} placeholder="List Name ?" onChangeText={text => this.setState({ name: text })} />
                    
                    <View style={{flexDirection: 'row', marginTop: 15, justifyContent: 'space-between'}}>{this.renderColors()}</View>

                    <TouchableOpacity style={[styles.create, {backgroundColor: this.state.color}]} onPress={this.createTodo}>
                       <Text style={{color: colors.white, fontWeight: 'bold'}}>Create!</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeBtn: {
        position: 'absolute',
        top: 60,
        right: 30,
    },
    title: {
        color: colors.white,
        fontSize: 28,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        color: colors.white,
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.blue,
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 100,
    }
});

export default AddListModal;
