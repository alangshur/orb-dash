import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './home';
import Game from './game';
import End from './end';

// build app navigator
const StackNavigator = createStackNavigator(
    {
        Home: Home,
        Game: Game,
        End: End
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none'
    }
);

// containerize navigator
const App = createAppContainer(StackNavigator)
export default App;