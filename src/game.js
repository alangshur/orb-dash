import React, { Component } from 'react';
import { View, StatusBar, Text, Button, StyleSheet } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

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
            <GestureRecognizer
                onSwipeUp={this._onSwipeUp}
                onSwipeDown={this._onSwipeDown}
                onSwipeLeft={this._onSwipeLeft}
                onSwipeRight={this._onSwipeRight}
                config={{
                    velocityThreshold: 0.3, // TODO: TWEAK
                    directionalOffsetThreshold: 80 // TODO: TWEAK
                }}
                style={{
                    flex: 1,
                    backgroundColor: this.state.backgroundColor
                }}
            >
                <View style={styles.container}>
                    <Text style={styles.scoreText}>{this.state.score}</Text>

                    <Button 
                        title='Game Over'
                        onPress={this._handleGameOver}
                    />
                </View>
            </GestureRecognizer>
        );
    }

    _runGamePage = () => {
        console.log('Game page.');
        StatusBar.setHidden(true);






        // this.props.navigation.replace('End', {
        //     score: this.state.score
        // });
    }

    _onSwipeUp() {
        console.log('You swiped up!');
    }
     
    _onSwipeDown() {
        console.log('You swiped down!');
    }
    
    _onSwipeLeft() {
        console.log('You swiped left!');
    }
    
    _onSwipeRight() {
        console.log('You swiped right!');
    }
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