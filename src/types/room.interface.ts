import { MessageType } from './message.interface';

/** 방 종류 (1:개인, 2:단체) */
export type RoomType = 1 | 2;
/** 상태 (0:퇴장, 1:참여) */
export type RoomState = 0 | 1;
/** 방 알림 (0:사용안함, 1:사용) */
export type RoomAlert = 0 | 1;

export interface Room {
  /** 팀 번호 */
  team: number;
  /** 방 종류 (1:개인, 2:단체) */
  roomtype: RoomType;
  /** 상태 (0:퇴장, 1:참여) */
  state: RoomState;
  /** 방 알림 (0:사용안함, 1:사용) */
  alert: RoomAlert;
  /** 방 이름 */
  name: string;
  /** 메시지 번호 */
  msg: number;
  /** 유저 번호 */
  user: number;
  /** 메시지 종류 (1:일반, 2:파일) */
  msgtype: MessageType;
  /** 내용 길이 (장문 여부 판단 - content 글자 수와 다르면 장문, utf8mb4) */
  len: number;
  /** 내용 */
  content: string;
  /** 안 읽은 메시지 수 */
  newcount: number;
  /** 안 읽은 메시지 번호 시작 */
  newmsg: number;
  /** 메시지 생성시간(unix) */
  created: number;
  /** 다른 유저 번호 리스트 (state:1 - 참여 대화방인 경우) */
  users?: number[];
}

export interface GetRoomsResponse {
  /** 대화방 리스트 */
  rooms: Room[];
}
export interface CreateRoomResponse {
  /** 방 번호 */
  room: number;
}
export interface IntiveUsersResponse {
  /** 반 번호 (단체방으로 전환된 경우 새 방 번호) */
  room: number;
}
