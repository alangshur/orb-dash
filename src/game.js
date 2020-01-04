import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0
        }
    }
    
    componentDidMount = () => {
        this._runGamePage();
    }

    render = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.fontSize}>Game</Text>

                <Button 
                    title='Game Over'
                    onPress={this._handleGameOver}
                />
            </View>
        );
    }
    
    _runGamePage = () => {
        console.log('Game page.');
    }

    _startNewGame = () => {
        console.log('New game!');
    };

    _handleGameOver = () => {    
        console.log('Game over!');
        this.props.navigation.replace('End', {
            score: this.state.score
        });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c4c4c4'
    },
    text: {
        fontSize: 20
    }
});

export default Game;