import React, { Component } from 'react';
import { View, StatusBar, Image, Text, StyleSheet } from 'react-native';
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
        top: '16%',
        height: '17%'
    },
    highscoreText: {
        fontWeight: 'bold',
        fontSize: 13,
        color: '#ffffff',
    }
});

export default Home;