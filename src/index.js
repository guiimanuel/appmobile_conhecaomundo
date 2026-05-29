import { registerRootComponent } from 'expo';

import app from '../app';
export { default as countryScreen } from './screens/countryScreen';
export { default as changePhotoScreen } from './screens/changePhotoScreen';
export { default as favoriteScreen } from './screens/favoriteScreen';
export { default as homeScreen } from './screens/homeScreen';
export { default as loginScreen } from './screens/loginScreen';
export { default as profileScreen } from './screens/profileScreen';
export { default as signUpScreen } from './screens/signUpScreen';
export { default as profileEditScreen } from './screens/profileEditScreen';
export { default as passwordEditScreen } from './screens/passwordEditScreen';
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(app);
