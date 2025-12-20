import type { Middleware, MiddlewareAPI } from "redux";
import type { AppDispatch, RootState } from "../services/store";

export const socketMiddleware = (wsActions: any): Middleware => {
  let socket: WebSocket | null = null;

  return (store: MiddlewareAPI<AppDispatch, RootState>) =>
    (next) =>
    (action) => {
      const { dispatch } = store;
      const { type, payload } = action as { type: string; payload?: string };

      if (type === wsActions.wsInit) {
        socket = new WebSocket(payload as string);
      }

      if (!socket) return next(action);

      socket.onopen = (event) => {
        dispatch({ type: wsActions.onOpen, payload: true });
      };

      socket.onerror = (event) => {
        dispatch({ type: wsActions.onError, payload: event });
      };

      socket.onclose = (event) => {
        dispatch({ type: wsActions.onClose, payload: event });
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.success) {
          dispatch({ type: wsActions.onMessage, payload: data });
        }
      };

      next(action);
    };
};
