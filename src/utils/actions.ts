import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from "./action-types";
import { TOrder } from "./types";

export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload?: string;
}
export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: {
    message: string;
  };
}
export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: {
    orders: TOrder[];
    total: number;
    totalToday: number;
  };
}

export interface IWSSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
}

export type TWSActions =
  | IWSConnectionStart
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetMessageAction
  | IWSSendMessageAction;
