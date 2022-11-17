import { AxiosInstance } from 'axios';

import { RoomDetail } from '~types/room';
import { HOST } from '~utils/constants';

export class RoomAPI {
  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async getRoomDetail(room: number) {
    return this.axiosInstance.get<RoomDetail>(`${HOST.EDGE}/room/${room}`).then((res) => res.data);
  }
}
