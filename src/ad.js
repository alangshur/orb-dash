import React, { Component } from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
} from 'react-native';
// import { AdMobInterstitial } from 'react-native-admob';

// const BannerExample = ({ style, title, children, ...props }) => (
//     <View {...props} style={[styles.example, style]}>
//         <Text style={styles.title}>{title}</Text>
//         <View>{children}</View>
//     </View>
// );

// class Ad extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             fluidSizeIndex: 0,
//         };
//     }

//     componentDidMount() {
//         AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
//         AdMobInterstitial.setAdUnitID('ca-app-pub-7827226868322328~1629571787');

//         AdMobInterstitial.addEventListener('adLoaded', () =>
//             console.log('AdMobInterstitial adLoaded'),
//         );

//         AdMobInterstitial.addEventListener('adFailedToLoad', error =>
//             console.warn(error),
//         );

//         AdMobInterstitial.addEventListener('adOpened', () =>
//             console.log('AdMobInterstitial => adOpened'),
//         );

//         AdMobInterstitial.addEventListener('adClosed', () => {
//             console.log('AdMobInterstitial => adClosed');
//             AdMobInterstitial.requestAd().catch(error => console.warn(error));
//         });

//         AdMobInterstitial.addEventListener('adLeftApplication', () =>
//             console.log('AdMobInterstitial => adLeftApplication'),
//         );

//         AdMobInterstitial.requestAd().catch(error => console.warn(error));
//     }

//     componentWillUnmount() {
//         AdMobInterstitial.removeAllListeners();
//     }

//     showInterstitial() {
//         AdMobInterstitial.showAd().catch(error => console.warn(error));
//     }

//     render() {
//         return (
//             <View style={styles.container}>
//                 <BannerExample title="Interstitial">
//                     <Button
//                         title="Show Interstitial and preload next"
//                         onPress={this.showInterstitial}
//                     />
//                 </BannerExample>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         height: '100%',
//         width: '100%'
//     },
//     example: {
//         paddingVertical: 10,
//     },
//     title: {
//         margin: 10,
//         fontSize: 20,
//     },
// });

class Ad extends Component {
    render = () => {
        return (<View></View>);
    }
}

export default Ad;