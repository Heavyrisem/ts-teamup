export enum STATUS {
  ONLINE,
  OFFLINE,
  UNAUTHORIZED,
  ERROR,
}

export type EventHandlerFunction<T = any> = (event: T) => void;
