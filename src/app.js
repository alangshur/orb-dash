import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './home';
import Game from './game';
import End from './end';
import Ad from './ad';

const StackNavigator = createStackNavigator(
    {
        Home: Home,
        Game: Game,
        End: End,
        Ad: Ad
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
        navigationOptions: {
            gesturesEnabled: false
        }
    }
);

const App = createAppContainer(StackNavigator)
export default App;