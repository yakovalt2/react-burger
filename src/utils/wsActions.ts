import { TOrder } from "./types";

export const wsOrdersActions = {
  wsInit: "WS_CONNECTION_START" as const,
  wsClose: "WS_CONNECTION_CLOSE" as const,
  onOpen: "WS_CONNECTION_SUCCESS" as const,
  onError: "WS_CONNECTION_ERROR" as const,
  onMessage: "WS_GET_MESSAGE" as const,
};

export type TWSActions =
  | { type: typeof wsOrdersActions.wsInit; payload: string }
  | { type: typeof wsOrdersActions.wsClose }
  | { type: typeof wsOrdersActions.onOpen; payload: Event }
  | { type: typeof wsOrdersActions.onError; payload: Event }
  | {
      type: typeof wsOrdersActions.onMessage;
      payload: {
        success: boolean;
        orders: TOrder[];
        total: number;
        totalToday: number;
      };
    };
