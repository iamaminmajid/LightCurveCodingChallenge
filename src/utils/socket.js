import { runner } from './blackBox'
let subscribed = {};

const loop = (event, cb) => {
    if (!subscribed[event]) {
        return;
    }
    runner(cb).catch();
    setTimeout(() => loop(event, cb), 1000);
};


const subscribe = (channel, cb) => {
    subscribed[channel] = true;
    loop(channel, cb);
}

const unsubscribe = (channel) => {
    subscribed[channel] = false;
}

let connectionCount = 0

const close = () => {
    --connectionCount
    subscribed = {}
}

export const socket = (baseURL) => {
    ++connectionCount
    console.log(`connecting to ${baseURL}`)
    if(connectionCount > 1) {
        console.log(`multiple socket connection is slow down the service ${connectionCount}`)
    }
    return {
        subscribe,
        unsubscribe,
        close
    }
}

