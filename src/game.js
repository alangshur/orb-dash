import React, { Component } from 'react';
import { Animated, Image, Dimensions, View, StatusBar, Text, StyleSheet, Easing } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

import upOrb from './assets/up.png'
import rightOrb from './assets/right.png'
import downOrb from './assets/down.png'
import leftOrb from './assets/left.png'
import northOrb from './assets/north.png'
import eastOrb from './assets/east.png'
import southOrb from './assets/south.png'
import westOrb from './assets/west.png'
import greenOrb from './assets/green.png'
import blueOrb from './assets/blue.png'
import yellowOrb from './assets/yellow.png'
import redOrb from './assets/red.png'

// game engine constants
const DIRECTION_TIME = 2800.0;
const CARDINAL_TIME = 2500.0;
const COLOR_TIME = 2200.0;
const END_GAME_TIME = 300.0;
const DIRECTION_STEPS = 15.0;
const CARDINAL_STEPS = 15.0;
const COLOR_STEPS = 15.0;

// animation/timer constants
const FLASH_TIME_MS = 75;
const FADE_IN_ORB_TIME_MS = 600;
const SLIDE_ORB_TIME_MS = 250;
const LAST_SWIPE_W_BUFFER = 250 + 200;
const TIME_EXPIRED_W_BUFFER = 50;

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
    ['north', 'up'],
    ['east', 'right'],
    ['south', 'down'],
    ['west', 'left']
]);
const COLOR_MAP = new Map([
    ['green', 'up'],
    ['blue', 'right'],
    ['yellow', 'down'],
    ['red', 'left']
]);
const COMBINED_MAP = new Map([
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

// image constants
const IMAGE_MAP = new Map([
    ['up', upOrb],
    ['right', rightOrb],
    ['down', downOrb],
    ['left', leftOrb],
    ['north', northOrb],
    ['east', eastOrb],
    ['south', southOrb],
    ['west', westOrb],
    ['green', greenOrb],
    ['blue', blueOrb],
    ['yellow', yellowOrb],
    ['red', redOrb]
]);

// dimension constants
const SCREEN_DIMENSIONS = Dimensions.get('window');

class Circle extends Component {
    render = () => { 
        return ( 
            <View style={styles.circle}/> 
        );
    }
}

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            lastSwipe: 0,
            gameStep: this._generateNextStep(0),
            orbOpacity: new Animated.Value(0),
            slidingTimerY: new Animated.Value(0),
            slidingOrbY: new Animated.Value(0),
            orbOffsetX: new Animated.Value(SCREEN_DIMENSIONS.width / 2 - 20),
            orbOffsetY: new Animated.Value(SCREEN_DIMENSIONS.height / 2 - 20),
            flashOpacity: 0
        }
    }
    
    componentDidMount = () => {
        this._runGamePage();
    }

    render = () => {
        return (
            <>
                <View 
                    style={styles.flashScreen}
                    opacity={this.state.flashOpacity}
                    zIndex={this.state.flashOpacity}
                />
                <GestureRecognizer
                    onSwipeUp={this._onSwipeUp}
                    onSwipeDown={this._onSwipeDown}
                    onSwipeLeft={this._onSwipeLeft}
                    onSwipeRight={this._onSwipeRight}
                    config={{
                        velocityThreshold: 0.3, 
                        directionalOffsetThreshold: 60 
                    }}
                    style={{
                        flex: 1,
                        backgroundColor: this.state.backgroundColor
                    }}
                >
                    <View style={styles.container}>
                        <Text style={styles.scoreText}>{this.state.score}</Text>
                        
                        <Animated.View 
                            style={{ ...styles.orbView, opacity: this.state.orbOpacity }}
                            left={this.state.orbOffsetX}
                            top={this.state.orbOffsetY}
                        >
                            <Image
                                source={IMAGE_MAP.get(this.state.gameStep.type)}
                                style={styles.orbImage}
                            />
                            <Circle/>
                        </Animated.View>

                        <Animated.View 
                            style={styles.slidingTimer}
                            height={this.state.slidingTimerY}
                        />
                    </View>
                </GestureRecognizer>
            </>
        );
    }

    _runGamePage = () => {
        console.log('Game page.');
        StatusBar.setHidden(true);

        // initial game step
        this._restartTimer(this.state.gameStep.time);
        this._fadeInOrb();
    }

    _onSwipeUp = () => {
        
        // check for accidental swipe
        if (Date.now() <= this.state.lastSwipe + LAST_SWIPE_W_BUFFER) return;
        else this.setState({ lastSwipe: Date.now() });

        // handle valid swipe
        if (this.state.gameStep.solution == 'up') {
            console.log('Up: Correct.');
            Animated.timing(         
                this.state.orbOffsetY,
                {
                    toValue: -90,           
                    duration: SLIDE_ORB_TIME_MS,       
                }
            ).start(() => {

                // flash screen every five
                if ((this.state.score + 1) % 5 == 0) {
                    this.setState({ flashOpacity: 1 }, () => {
                        setTimeout(() => { 
                            this.setState({ flashOpacity: 0 });
                        }, FLASH_TIME_MS);
                    });
                }

                this._startNextGameStep();
            });
        }
        else {
            console.log('Up: Incorrect.');
            this._exitGame();
        }
    }

    _onSwipeRight = () => {

        // check for accidental swipe
        if (Date.now() <= this.state.lastSwipe + LAST_SWIPE_W_BUFFER) return;
        else this.setState({ lastSwipe: Date.now() });

        // handle valid swipe
        if (this.state.gameStep.solution == 'right') {
            console.log('Right: Correct.');
            Animated.timing(         
                this.state.orbOffsetX,
                {
                    toValue: SCREEN_DIMENSIONS.width + 90,           
                    duration: SLIDE_ORB_TIME_MS,       
                }
            ).start(() => {
                
                // flash screen every five
                if ((this.state.score + 1) % 5 == 0) {
                    this.setState({ flashOpacity: 1 }, () => {
                        setTimeout(() => { 
                            this.setState({ flashOpacity: 0 });
                        }, FLASH_TIME_MS);
                    });
                }

                this._startNextGameStep();
            });
        }
        else {
            console.log('Right: Incorrect.');
            this._exitGame();
        }
    }
     
    _onSwipeDown = () => {
        
        // check for accidental swipe
        if (Date.now() <= this.state.lastSwipe + LAST_SWIPE_W_BUFFER) return;
        else this.setState({ lastSwipe: Date.now() });

        // handle valid swipe
        if (this.state.gameStep.solution == 'down') {
            console.log('Down: Correct.');
            Animated.timing(         
                this.state.orbOffsetY,
                {
                    toValue: SCREEN_DIMENSIONS.height + 90,           
                    duration: SLIDE_ORB_TIME_MS,       
                }
            ).start(() => {
                
                // flash screen every five
                if ((this.state.score + 1) % 5 == 0) {
                    this.setState({ flashOpacity: 1 }, () => {
                        setTimeout(() => { 
                            this.setState({ flashOpacity: 0 });
                        }, FLASH_TIME_MS);
                    });
                }

                this._startNextGameStep();
            });
        }
        else {
            console.log('Down: Incorrect.');
            this._exitGame();
        }
    }
    
    _onSwipeLeft = () => {
        
        // check for accidental swipe
        if (Date.now() <= this.state.lastSwipe + LAST_SWIPE_W_BUFFER) return;
        else this.setState({ lastSwipe: Date.now() });

        // handle valid swipe
        if (this.state.gameStep.solution == 'left') {
            console.log('Left: Correct.');
            Animated.timing(         
                this.state.orbOffsetX,
                {
                    toValue: -90,           
                    duration: SLIDE_ORB_TIME_MS,       
                }
            ).start(() => {
                
                // flash screen every five
                if ((this.state.score + 1) % 5 == 0) {
                    this.setState({ flashOpacity: 1 }, () => {
                        setTimeout(() => { 
                            this.setState({ flashOpacity: 0 });
                        }, FLASH_TIME_MS);
                    });
                }

                this._startNextGameStep();
            });
        }
        else {
            console.log('Left: Incorrect.');
            this._exitGame();
        }
    }

    _exitGame = () => {
        this.props.navigation.replace('End', {
            score: this.state.score
        });
    }

    _startNextGameStep = () => {

        // set next game step
        this.setState({
            gameStepActive: false,
            score: this.state.score + 1,
            gameStep: this._generateNextStep(this.state.score + 1),
            orbOffsetX: new Animated.Value(SCREEN_DIMENSIONS.width / 2 - 20 + (Math.random() * 80 - 40)),
            orbOffsetY: new Animated.Value(SCREEN_DIMENSIONS.height / 2 - 20 + (Math.random() * 200 - 100))
        }, () => {
            this._restartTimer(this.state.gameStep.time);
            this._fadeInOrb();
        });
    }

    _restartTimer = time => {
        const now = Date.now();
        this.setState({ slidingTimerY: new Animated.Value(0) }, () => {
            Animated.timing(this.state.slidingTimerY, {
                toValue: SCREEN_DIMENSIONS.height - 40,
                duration: time,
                easing: Easing.linear
            }).start(() => {

                // expire time if no swipe or late swipe
                if (this.state.lastSwipe >= now + time + TIME_EXPIRED_W_BUFFER 
                    || this.state.lastSwipe < now) {
                    console.log('Time expired');
                    this._exitGame();
                }
            });
        });
    }

    _fadeInOrb = () => {
        this.setState({ orbOpacity: new Animated.Value(0) }, () => {
            Animated.timing(         
                this.state.orbOpacity,
                {
                    toValue: 1,           
                    duration: FADE_IN_ORB_TIME_MS,       
                }
            ).start();
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
            var type = COMBINED_MAP[COMBINED_MAP.length * Math.random() | 0];
            var solution = COMBINED_MAP.get(type);
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
        borderLeftColor: '#b80000',
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
        fontSize: 70
    },
    slidingTimer: {
        position: 'absolute',
        zIndex: -1,
        width: '100%',
        bottom: 0,
        backgroundColor: '#bdbdbd'
    },
    orbView: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    orbImage: {
        position: 'absolute',
        width: 90,
        height: 90,
        resizeMode: 'contain'
    },
    circle: { 
        position: 'absolute',
        zIndex: -1,
        width: 80, 
        height: 80, 
        borderRadius: 45,
        backgroundColor: '#dbdbdb' 
    },
    flashScreen: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#dbdbdb'
    }
});

export default Game;