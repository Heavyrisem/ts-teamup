import { MessageType } from './message';

export interface RoomDetail {
  room: number;
  name: string;
  state: boolean;
  pinstate: boolean;
  pinseq: boolean;
  alert: boolean;
  msg: number;
  user: number;
  msgtype: MessageType;
  len: number;
  content: string;
  newcount: number;
  newmsg: number;
  created: number;
  team: number;
  roomtype: 1 | 2;
  users?: number[];
  file?: {
    name?: string;
    size?: number;
    id?: string;
    owner?: number;
    type?: string;
    thumbnail?: {
      host?: string;
      path?: string;
      width?: number;
      height?: number;
    };
  };
}
