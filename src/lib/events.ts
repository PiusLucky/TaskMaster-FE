import mitt from "mitt";

//All Events
export const SEARCH_EVENT = "SEARCH_EVENT";

export const TMEmitter = () => {
  const emitter = mitt();
  return emitter;
};
