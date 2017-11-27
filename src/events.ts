import EventEmmiter = require('wolfy87-eventemitter');

const EVENT_EMMITER = new EventEmmiter();

export enum Event {
  GAME_END = 'GAME_END',
}

export function addListener(event: Event, listener: () => void) {
  EVENT_EMMITER.addListener(event, listener);
}

export function removeListener(event: Event, listener: () => void) {
  EVENT_EMMITER.removeListener(event, listener);
}

export function emit(event: Event, payload?: any) {
  EVENT_EMMITER.emit(event, payload);
}
