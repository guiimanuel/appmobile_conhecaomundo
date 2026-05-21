import { registerRootComponent } from 'expo';

import App from '../App';
export { default as CountryScreen } from './screens/CountryScreen';
export { default as ChangePhotoScreen } from './screens/ChangePhotoScreen';
export { default as FavoriteScreen } from './screens/FavoriteScreen';
export { default as HomeScreen } from './screens/HomeScreen';
export { default as LoginScreen } from './screens/LoginScreen';
export { default as ProfileScreen } from './screens/ProfileScreen';
export { default as SignUpScreen } from './screens/SignUpScreen';
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
