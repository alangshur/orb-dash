import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class End extends Component {
    handlePlayAgainButtonPress = () => {
        this.props.navigation.navigate('Game');
    };  

    handleHomeButtonPress = () => {
        this.props.navigation.navigate('Home');
    };  

    render = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.gameOverText}>Game Over</Text>
                <Text style={styles.scoreText}>Score: 50</Text>

                <Button 
                    title='Play Again'
                    style={styles.playAgainButton}
                    onPress={this.handlePlayAgainButtonPress}
                />

                <Button 
                    title='Home'
                    style={styles.homeButton}
                    onPress={this.handleHomeButtonPress}
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