import { registerRootComponent } from 'expo';

import App from '../App';
export { default as countryScreen } from './screens/countryScreen';
export { default as favoriteScreen } from './screens/favoriteScreen';
export { default as homeScreen } from './screens/homeScreen';
export { default as loginScreen } from './screens/loginScreen';
export { default as profileScreen } from './screens/profileScreen';
export { default as registerScreen } from './screens/registerScreen';
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
