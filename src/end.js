import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AwesomeButton from "react-native-really-awesome-button";

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
                <Image
                    source={require('./assets/game-over.png')}
                    style={styles.gameOverLogo}
                />

                <View marginBottom={20}>
                    <AwesomeButton
                        width={160}
                        height={45}
                        raiseLevel={0}
                        backgroundColor='#616161'
                        disabled={true}
                    >
                        <Text style={styles.scoreText}>
                            Score: {this.state.score}
                        </Text>
                    </AwesomeButton>
                </View>

                <View marginBottom={20}>
                    <AwesomeButton
                        width={160}
                        height={45}
                        raiseLevel={3}
                        backgroundColor='#d00013'
                        onPress={this._handlePlayAgainButtonPress}
                    >
                        Play Again  
                    </AwesomeButton>
                </View>

                <View>
                    <AwesomeButton
                        width={160}
                        height={45}
                        raiseLevel={3}
                        backgroundColor='#d00013'
                        onPress={this._handleHomeButtonPress}
                    >
                        Home  
                    </AwesomeButton>
                </View>
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
        alignItems: 'center',
        backgroundColor: '#c4c4c4'
    },
    gameOverLogo: {
        position: 'absolute',
        resizeMode: 'contain',
        top: '12%',
        height: '25%'
    },
    scoreText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 13
    }
});

export default End;