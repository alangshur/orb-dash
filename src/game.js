import React, { Component } from 'react';
import { Animated, Dimensions, View, StatusBar, Text, StyleSheet, Easing } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

const SCREEN_DIMENSIONS = Dimensions.get('window');

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 69,
            gameRunning: true,
            slidingTimerY: new Animated.Value(0),
        }
    }
    
    componentDidMount = () => {
        this._runGamePage();
        this._restartTimer(5000);
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

                    <Animated.View 
                        style={styles.slidingTimer}
                        height={this.state.slidingTimerY}
                    />
                </View>
            </GestureRecognizer>
        );
    }

    _runGamePage = () => {
        console.log('Game page.');
        StatusBar.setHidden(true);

        // run game loop
        while (this.state.gameRunning) {

            // START WITH UP, DOWN, LEFT, RIGHT
            // THEN MIX WITH NORTH, SOUTH, EAST, WEST
            // THEN MIX IN COLORS
            // SLOWLY GET FASTER AND THEN ACCELERATE ONCE HITTING COLORS

            break;
        }   
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

    _exitGame() {
        this.props.navigation.replace('End', {
            score: this.state.score
        });
    }

    _restartTimer(time) {
        this.setState({ slidingTimerY: new Animated.Value(0) }, () => {
            Animated.timing(this.state.slidingTimerY, {
                toValue: SCREEN_DIMENSIONS.height - 40,
                duration: time,
                easing: Easing.linear
            }).start();
        });
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
        top: '7%',
        fontWeight: 'bold',
        fontSize: 55
    },
    slidingTimer: {
        position: 'absolute',
        zIndex: -1,
        width: '100%',
        bottom: 0,
        backgroundColor: '#bdbdbd'
    }
});

export default Game;