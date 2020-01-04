import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class Home extends Component {
    constructor(props) {
        
    }

    componentDidMount = () => {
        // FETCH HIGH SCORE FROM STORAGE AND UPDATE STATE
    };

    handlePlayButtonPress = () => {
        this.props.navigation.navigate('Game');
    };  

    render = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>Swipe Game</Text>
                <Text style={styles.highscoreText}>High Score: 100</Text>

                <Button 
                    title='Play'
                    style={styles.playButton}
                    onPress={this.handlePlayButtonPress}
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