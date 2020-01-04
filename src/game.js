import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class Game extends Component {
    handleGameOver = () => {    
        this.props.navigation.navigate('End');
    };

    render = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.fontSize}>Game</Text>

                <Button 
                    title='Game Over'
                    onPress={this.handleGameOver}
                />
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