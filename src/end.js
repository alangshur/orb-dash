import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class End extends Component {
    constructor(props) {
        super(props);
        score = props.navigation.getParam('score');
        this.state = { score: score };
    }

    componentDidMount = () => {
        this._runEndPage();
    }

    render = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.gameOverText}>Game Over</Text>
                <Text style={styles.scoreText}>Score: {this.state.score}</Text>

                <Button 
                    title='Play Again'
                    style={styles.playAgainButton}
                    onPress={this._handlePlayAgainButtonPress}
                />

                <Button 
                    title='Home'
                    style={styles.homeButton}
                    onPress={this._handleHomeButtonPress}
                />
            </View>
        );
    }

    _runEndPage = () => {
        console.log('End page.');

        this._getHighscore((error, result) => {
            if (error) console.log(error);
            else if (result !== null && this.state.score > result)
                this._setHighscore(String(this.state.score));
        });
    };

    _handlePlayAgainButtonPress = () => {
        this.props.navigation.replace('Game');
    };  

    _handleHomeButtonPress = () => {
        this.props.navigation.replace('Home', this.state);
    };  

    _getHighscore = (callback) => {
        AsyncStorage.getItem('highscore', callback);
    }

    _setHighscore = async (highscore) => {
        try { await AsyncStorage.setItem('highscore', highscore); }
        catch (e) { console.log('Error: ' + e); }
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gameOverText: {
        fontSize: 30
    },
    scoreText: {
        fontSize: 12
    },
    playAgainButton: {
        fontSize: 15
    },
    homeButton: {
        fontSize: 15
    }
});

export default End;