import { AxiosInstance } from 'axios';

import {
  GetMessagesResponse,
  MessageSummary,
  SendMessageBody,
  SendMessageResponse,
} from '~types/message.interface';
import { HOST } from '~utils/constants';
import { genURL } from '~utils/url';

export class MessageAPI {
  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  /**
   * 장문 메시지
   * @param room 방 번호
   * @param msg 메시지 번호
   */
  async getMessage(room: number, msg: number) {
    return this.axiosInstance
      .get<string>(`${HOST.EDGE}/message/${room}/${msg}`)
      .then((res) => String(res.data));
  }

  /**
   * 메시지 목록
   * @param room 방 번호
   * @param count 가져올 메시지 수
   * Size range: 1-100
   * @param way 방향 (0:최신, 1:이전, 2:이후)
   * Default value: 0
   * Size range: 0-2
   * @param start 메시지 번호 시작
   */
  async getMessages(room: number, count: number, way?: number, start?: number) {
    return this.axiosInstance
      .get<GetMessagesResponse>(genURL(`${HOST.EDGE}/message/${room}/${count}`, way, start))
      .then((res) => res.data);
  }

  /**
   * 메시지 생성
   * @param room 방 번호
   * @param data 종류 (1:일반, 2:파일)
   * Default value: 1
   * Size range: 1-2
   */
  async sendMessage(room: number, data: SendMessageBody) {
    const { type, ...messageData } = data;
    return this.axiosInstance
      .post<SendMessageResponse>(genURL(`${HOST.EDGE}/message/${room}`, type), messageData)
      .then((res) => res.data);
  }

  /**
   * 메시지 요약 정보
   * @param room 방 번호
   * @param msg 메시지 번호
   * @param confirm 읽음 처리(0:안함, 1:읽음)
   * Default value: 0
   * Size range: 0-1
   * @param all 전체 내용 여부(0:요약, 1:전체)
   * Default value: 0
   * Size range: 0-1
   */
  async getMessageSummary(room: number, msg: number, confirm?: number, all?: number) {
    return this.axiosInstance
      .get<MessageSummary>(genURL(`${HOST.EDGE}/message/summary/${room}/${msg}`, confirm), {
        params: { all },
      })
      .then((res) => res.data);
  }
}
