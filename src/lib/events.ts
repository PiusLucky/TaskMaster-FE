import mitt from "mitt";

const emitter = mitt();
export const TMEmitter = emitter;

//All Events
export const SEARCH_EVENT = "SEARCH_EVENT";
