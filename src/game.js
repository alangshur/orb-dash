import React, { Component } from 'react';
import { View, StatusBar, Text, Button, StyleSheet } from 'react-native';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 69
        }
    }
    
    componentDidMount = () => {
        this._runGamePage();
    }

    render = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.scoreText}>{this.state.score}</Text>

                <Button 
                    title='Game Over'
                    onPress={this._handleGameOver}
                />
            </View>
        );
    }

    _runGamePage = () => {
        console.log('Game page.');
        StatusBar.setHidden(true);
    }

    _handleGameOver = () => {    
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
        backgroundColor: '#dbdbdb',
        borderLeftWidth: 20,
        borderLeftColor: '#9e0000',
        borderTopWidth: 20,
        borderTopColor: '#009e00',
        borderRightWidth: 20,
        borderRightColor: '#00009e',
        borderBottomWidth: 20,
        borderBottomColor: '#dbd100'
    },
    scoreText: {
        position: 'absolute',
        top: '8%',
        fontWeight: 'bold',
        fontSize: 60
    }
});

export default Game;