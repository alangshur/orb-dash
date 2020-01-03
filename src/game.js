import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Game extends Component {
    render = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.fontSize}>Game</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20
    }
});

export default Game;