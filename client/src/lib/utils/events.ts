import { useEffect } from "react";

export type EventListener = {
  name: string;
  callback: EventListenerOrEventListenerObject;
};

export const useEventsListeners = (listeners: EventListener[], deps: any[]) => {
  useEffect(() => {
    listeners.forEach(({ name, callback }) =>
      window.addEventListener(name, callback),
    );

    return () => {
      listeners.forEach(({ name, callback }) =>
        window.removeEventListener(name, callback),
      );
    };
  }, deps);
};
