import { AxiosInstance } from 'axios';

import { GetRoomsResponse, Room } from '~types/room.interface';
import { HOST } from '~utils/constants';
import { genURL } from '~utils/url';

export class RoomAPI {
  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  /**
   * 대화방 정보
   * @param room 방 번호
   */
  async getRoomDetail(room: number) {
    return this.axiosInstance.get<Room>(`${HOST.EDGE}/room/${room}`).then((res) => res.data);
  }

  /**
   * 대화방 목록
   * @param team 팀 번호
   * @param room 방 번호 Size range: ..1000
   * @param type 종류 (active:활성, inactive:퇴장, all:전체)
   * Default value: active
   * Allowed values: active, inactive, all
   */
  async getRooms(team?: number, room?: number[], type?: 'active' | 'inactive' | 'all') {
    return this.axiosInstance
      .get<GetRoomsResponse>(genURL(`${HOST.EDGE}/rooms`, team, room), { params: { type } })
      .then((res) => res.data);
  }

  /**
   * 대화방 생성
   * @param team 팀 번호
   * @param users 유저 번호 리스트
   */
  async createRoom(team: number, users: number[]) {
    return this.axiosInstance.post(`${HOST.EDGE}/room/${team}`, { users }).then((res) => res.data);
  }

  /**
   * 대화방 초대
   * @param room 방 번호
   * @param users 유저 번호 리스트
   */
  async inviteUsers(room: number, users: number[]) {
    return this.axiosInstance
      .post(`${HOST.EDGE}/room/join/${room}`, { users })
      .then((res) => res.data);
  }

  /**
   * 대화방 퇴장
   * @param room 방 번호
   * @param name 방 이름 (퇴장 이후 대화방 이름 지정)
   */
  async leaveRoom(room: number, name: string) {
    return this.axiosInstance
      .delete(`${HOST.EDGE}/room/${room}/${name}`)
      .then((res) => res.status === 204);
  }
}
