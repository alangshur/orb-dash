import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { highscore: 0 };
    }

    componentDidMount = () => {
        this._runHomePage();
    };

    render = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>Swipe Game</Text>
                <Text style={styles.highscoreText}>High Score: {this.state.highscore}</Text>

                <Button 
                    title='Play'
                    style={styles.playButton}
                    onPress={this._handlePlayButtonPress}
                />
            </View>
        );
    }

    _runHomePage = () => {
        console.log('Home page.');

        this._getHighscore((error, result) => {
            if (error) console.log(error);
            else if (result !== null) 
                this.setState({ highscore: result });
        });  
    };

    _handlePlayButtonPress = () => {
        this.props.navigation.replace('Game');
    };  

    _getHighscore = (callback) => {
        AsyncStorage.getItem('highscore', callback);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 30
    },
    highscoreText: {
        fontSize: 12
    },
    playButton: {
        fontSize: 15
    }
});

export default Home;