import { AxiosInstance } from 'axios';

import { EventResponse } from '~types/event.interface';
import { HOST } from '~utils/constants';

export class EventAPI {
  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async getEvent() {
    return this.axiosInstance.get<EventResponse>(`${HOST.EVENT}/events`).then((res) => res.data);
  }
}
