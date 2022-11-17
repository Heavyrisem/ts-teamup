import { AxiosInstance } from 'axios';

import { MessageType, SendMessageContent, SendMessageResponse } from '~types/message';
import { HOST } from '~utils/constants';

export class MessageAPI {
  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async getMessage(room: number, message: number) {
    return this.axiosInstance
      .get<string>(`${HOST.EDGE}/message/${room}/${message}`)
      .then((res) => String(res.data));
  }

  async sendMessage(room: number, content: SendMessageContent, type?: MessageType) {
    return this.axiosInstance
      .post<SendMessageResponse>(`${HOST.EDGE}/message/${room}${type ? `/${type}` : ''}`, content)
      .then((res) => res.data);
  }
}
