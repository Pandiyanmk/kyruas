/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './app.tsx';
import 'react-native-gesture-handler';
import TrackPlayer from 'react-native-track-player';
import { PlaybackService } from './service';




AppRegistry.registerComponent(appName, () => App);

TrackPlayer.registerPlaybackService(() => PlaybackService);
