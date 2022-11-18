/** 종류 (1:일반, 2:파일, 3:초대, 4:퇴장) */
export type MessageType = 1 | 2 | 3 | 4;
/** 알림 (0:사용안함, 1:사용, type: chat.room) */
export type AlertType = 0 | 1;
/** 방 종류 (1:개인, 2:단체, type: chat.initbot) */
export type RoomType = 1 | 2;

export interface ChatEvent {
  /** 팀 번호 */
  team: number;
  /** 방 번호 */
  room: number;
  /** 유저 번호 (type: chat.message,detach,initbot) */
  user: number;
  /** 메시지 번호 (type: chat.message) */
  msg: number;
  /** 알림 (0:사용안함, 1:사용, type: chat.room) */
  alert: AlertType;
  /** 방 이름 (type: chat.room) */
  name: string;
  /** 방 종류 (1:개인, 2:단체, type: chat.initbot) */
  roomtype: RoomType;
  /** 종류 (1:일반, 2:파일, 3:초대, 4:퇴장) */
  type: MessageType;
}
export interface SendMessageBody {
  /** 종류 (1:일반, 2:파일)
   * Default value: 1
   * Size range: 1-2 */
  type?: MessageType;
  /** 내용 (type:2 파일 아이디) */
  content: string;
  /** 태그 피드 번호 리스트 */
  tagfeeds?: number[];
  /** 추가 정보 리스트 (type:1, tagfeeds:null) */
  extras?: Record<string, any>[];
}

export interface SendMessageResponse {
  /** 베시지 번호 */
  msg: number;
}

export interface Message {
  /** 메시지 번호 */
  msg: number;
  /** 유저 번호 */
  user: number;
  /** 종류 (1:일반, 2:파일, 3:초대, 4:퇴장) */
  type: MessageType;
  /** 내용 길이 (장문 여부 판단 - content 글자 수와 다르면 장문, utf8mb4) */
  len: number;
  /** 내용 */
  content: string;
  /** 생성시간(unix) */
  created: number;
}
export interface MessageSummary
  extends Pick<Message, 'user' | 'type' | 'len' | 'content' | 'created'> {
  /** 팀 번호 */
  team: number;
}
export interface GetMessagesResponse {
  msgs: Message[];
}
