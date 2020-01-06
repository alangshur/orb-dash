import React, { Component } from 'react';
import { View, StatusBar, Image, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AwesomeButton from "react-native-really-awesome-button";

import titleLogo from './assets/title-logo.png'

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
                <Image
                    source={titleLogo}
                    style={styles.titleLogo}
                />

                <View marginBottom={20}>
                    <AwesomeButton
                        width={200}
                        height={60}
                        raiseLevel={0}
                        backgroundColor='#616161'
                        disabled={true}
                    >
                        <Text style={styles.highscoreText}>
                            Highscore: {this.state.highscore}
                        </Text>
                    </AwesomeButton>
                </View>

                <View>
                    <AwesomeButton
                        width={200}
                        height={60}
                        textSize={18}
                        raiseLevel={3}
                        backgroundColor='#b20211'
                        onPress={this._handlePlayButtonPress}
                    >
                        Play    
                    </AwesomeButton>
                </View>
            </View>
        );
    }

    _runHomePage = () => {
        console.log('Home page.');
        StatusBar.setHidden(true);

        // fetch and post highscore
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
        alignItems: 'center',
        backgroundColor: '#dbdbdb'
    },
    titleLogo: {
        position: 'absolute',
        resizeMode: 'contain',
        top: '14%',
        height: '19%'
    },
    highscoreText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#ffffff',
    }
});

export default Home;