
import Player from '@vimeo/player';
import { throttle } from 'lodash';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
let serializedCurrentTime;

try {
    const videoPlayerCurrentTime = localStorage.getItem("videoplayer-current-time");
    serializedCurrentTime = videoPlayerCurrentTime === null ? undefined : JSON.parse(videoPlayerCurrentTime);
} catch (error) {
    console.error("Get state error: ", error.message);
}

if (serializedCurrentTime) {
    player.setCurrentTime(serializedCurrentTime)
        .catch((error) => {
            switch (error.name) {
                case 'RangeError':
                    throw new Error('The time was less than 0 or greater than the video’s duration');

                default:
                    throw new Error('Error with Vimeo player occured');
            }
    });
}


const onPlay = ({seconds}) => {
    localStorage.setItem("videoplayer-current-time", JSON.stringify(seconds));
};

player.on('timeupdate', throttle(onPlay, 1000));
