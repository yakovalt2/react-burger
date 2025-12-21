import type { Middleware, MiddlewareAPI } from "redux";
import type {
  AppActions,
  TWSStoreActions,
  AppDispatch,
  RootState,
} from "./types";

export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let manuallyClosed = false;

    return (next) => (action: AppActions) => {
      const { dispatch } = store;
      const { wsInit, onOpen, onClose, onError, onMessage, wsSendMessage } = wsActions;

      if (action.type === wsInit) {
        const startAction = action as Extract<
          AppActions,
          { type: typeof wsInit; payload?: string }
        >;
        if (!startAction.payload) return;

        if (socket) return;
        manuallyClosed = false;

        socket = new WebSocket(startAction.payload);

        socket.onopen = () => {
          console.log("WebSocket открыт");
          dispatch({ type: onOpen });
        };

        socket.onclose = (event) => {
          dispatch({
            type: onClose,
            payload: {
              code: event.code,
              reason: event.reason,
              wasClean: event.wasClean,
            },
          });
          socket = null;
        };

        socket.onerror = (event) => {
          dispatch({
            type: onError,
            payload: {
              message: (event as any).message || "WebSocket error",
            },
          });
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.success) {
            dispatch({ type: onMessage, payload: data });
          }
        };
      }
      
      if (action.type === onClose && socket && !manuallyClosed) {
        manuallyClosed = true;
        socket.close();
      }

      next(action);
    };
  }) as Middleware;
};
