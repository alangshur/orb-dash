import React, { Component } from 'react';
import { Animated, Dimensions, View, StatusBar, Text, StyleSheet, Easing } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

// timing constants
const DIRECTION_TIME = 4000.0;
const CARDINAL_TIME = 3000.0;
const COLOR_TIME = 2000.0;
const END_GAME_TIME = 300.0;
const DIRECTION_STEPS = 20.0;
const CARDINAL_STEPS = 30.0;
const COLOR_STEPS = 250.0;

// type constants
const DIRECTION_MAP_ARR = new Array('up', 'right', 'down', 'left');
const CARDINAL_MAP_ARR = new Array('up', 'right', 'down', 'left', 
    'north', 'east', 'south', 'west');
const COLOR_MAP_ARR = new Array('up', 'right', 'down', 'left', 'north', 
    'east', 'south', 'west', 'green', 'blue', 'yellow', 'red');

// solution constants
const DIRECTION_MAP = new Map([
    ['up', 'up'],
    ['right', 'right'],
    ['down', 'down'],
    ['left', 'left']
]);
const CARDINAL_MAP = new Map([
    ['up', 'up'],
    ['right', 'right'],
    ['down', 'down'],
    ['left', 'left'],
    ['north', 'up'],
    ['east', 'right'],
    ['south', 'down'],
    ['west', 'left']
]);
const COLOR_MAP = new Map([
    ['up', 'up'],
    ['right', 'right'],
    ['down', 'down'],
    ['left', 'left'],
    ['north', 'up'],
    ['east', 'right'],
    ['south', 'down'],
    ['west', 'left'],
    ['green', 'up'],
    ['blue', 'right'],
    ['yellow', 'down'],
    ['red', 'left']
]);

// dimension constants
const SCREEN_DIMENSIONS = Dimensions.get('window');

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 69,
            gameRunning: true,
            slidingTimerY: new Animated.Value(0),
            step: this._generateNextStep(0)
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
                    velocityThreshold: 0.2, 
                    directionalOffsetThreshold: 100 
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
    }

    _onSwipeUp = () => {
        console.log('You swiped up!');

        // CHECK IF CORRECT

        this._restartTimer(1000);
    }
     
    _onSwipeDown = () => {
        console.log('You swiped down!');

        // CHECK IF CORRECT

        this._restartTimer(2000);
    }
    
    _onSwipeLeft = () => {
        console.log('You swiped left!');

        // CHECK IF CORRECT

        this._restartTimer(3000);
    }
    
    _onSwipeRight = () => {
        console.log('You swiped right!');

        // CHECK IF CORRECT

        this._restartTimer(4000);
    }

    _exitGame = () => {
        this.props.navigation.replace('End', {
            score: this.state.score
        });
    }

    _restartTimer = time => {
        this.setState({ slidingTimerY: new Animated.Value(0) }, () => {
            Animated.timing(this.state.slidingTimerY, {
                toValue: SCREEN_DIMENSIONS.height - 40,
                duration: time,
                easing: Easing.linear
            }).start();
        });
    }

    _generateNextStep = score => {
        
        // start with directions
        if (score < DIRECTION_STEPS) {
            var time = DIRECTION_TIME - ((DIRECTION_TIME - CARDINAL_TIME) / DIRECTION_STEPS) * score;
            var type = DIRECTION_MAP_ARR[DIRECTION_MAP_ARR.length * Math.random() | 0];
            var solution =  DIRECTION_MAP.get(type);
        }

        // mix in cardinals
        else if (score >= DIRECTION_STEPS && score < (DIRECTION_STEPS + CARDINAL_STEPS)) {
            var adjustedScore = score - DIRECTION_STEPS;
            var time = CARDINAL_TIME - ((CARDINAL_TIME - COLOR_TIME) / CARDINAL_STEPS) * adjustedScore;
            var type = CARDINAL_MAP_ARR[CARDINAL_MAP_ARR.length * Math.random() | 0];
            var solution = CARDINAL_MAP.get(type);
        }

        // mix in colors
        else if (score >= (DIRECTION_STEPS + CARDINAL_STEPS) && score < (DIRECTION_STEPS + CARDINAL_STEPS + COLOR_STEPS)) {
            var adjustedScore = score - DIRECTION_STEPS - CARDINAL_STEPS;
            var time = COLOR_TIME - ((COLOR_TIME - END_GAME_TIME) / COLOR_STEPS) * adjustedScore;
            var type = COLOR_MAP_ARR[COLOR_MAP_ARR.length * Math.random() | 0];
            var solution = COLOR_MAP.get(type);
        }

        // run end game
        else if (score >= (DIRECTION_STEPS + CARDINAL_STEPS + COLOR_STEPS)) {
            var time = END_GAME_TIME;
        }

        return {
            time: Math.round(time),
            type: type,
            solution: solution
        };
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
        top: '9%',
        fontWeight: 'bold',
        fontSize: 60
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