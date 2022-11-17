/** 1: 일반, 2: 파일 */
export type MessageType = 1 | 2;

export interface SendMessageContent {
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
