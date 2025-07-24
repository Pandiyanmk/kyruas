
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import { dummayMp3 } from '../store/LocalDataStore';


export const setUpPlayer = async () => {
    try {
        await TrackPlayer.setupPlayer()

    } catch (error) {
        console.log(error);
    }
}

export const addTracs = async (tracks = {
    url: dummayMp3,
    title: 'Avaritia',
}) => {
    try {
        await TrackPlayer.add([tracks])
    } catch (error) {
        console.log(error);
    }
}

export const playerState = async () => {
    const state = await TrackPlayer.getState();

    return state
}





export const togglePlayBack = async playBackState => {
    console.log(playBackState);

    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack != null) {
        if (playBackState == State.Paused) {

            await TrackPlayer.play();

        } else if (playBackState == State.Stopped) {
            const position = Math.round(await TrackPlayer.getPosition());
            const duration = Math.round(await TrackPlayer.getDuration());
            console.log(position, duration);

            if (position === duration) {
                // It's finished
                TrackPlayer.seekTo(0)
                TrackPlayer.play();
            }
        } else {
            await TrackPlayer.pause()
        }
    }
}