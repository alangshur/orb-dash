import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AwesomeButton from "react-native-really-awesome-button";

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
                    source={require('./assets/title-logo.png')}
                    style={styles.titleLogo}
                />

                <View marginBottom={20}>
                    <AwesomeButton
                        width={160}
                        height={45}
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
                        width={160}
                        height={45}
                        textSize={13}
                        raiseLevel={3}
                        backgroundColor='#d00013'
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
        backgroundColor: '#c4c4c4'
    },
    titleLogo: {
        position: 'absolute',
        resizeMode: 'contain',
        top: '17%',
        height: '15%'
    },
    highscoreText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 13
    }
});

export default Home;