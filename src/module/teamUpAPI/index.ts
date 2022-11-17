import axios, { AxiosInstance } from 'axios';

import { EventAPI } from './event';
import { MessageAPI } from './message';
import { RoomAPI } from './room';

import { AuthInfo, AuthRequest, AuthResponse } from '~types/auth';
import { HOST } from '~utils/constants';

export class TeamUpAPI {
  private readonly axiosInstance: AxiosInstance;
  readonly message: MessageAPI;
  readonly room: RoomAPI;
  readonly event: EventAPI;

  constructor(axiosInstance = axios.create()) {
    this.axiosInstance = axiosInstance;
    this.message = new MessageAPI(axiosInstance);
    this.room = new RoomAPI(axiosInstance);
    this.event = new EventAPI(axiosInstance);
  }

  async getTokenWithPassword(userAuth: AuthInfo) {
    const requestBody: AuthRequest = {
      grant_type: 'password',
      ...userAuth,
    };

    return axios
      .post<AuthResponse>(`${HOST.AUTH}/oauth2/token`, requestBody, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
      })
      .then((res) => res.data);
  }

  async login(userAuth: AuthInfo) {
    const auth = await this.getTokenWithPassword(userAuth);
    this.axiosInstance.defaults.headers.Authorization = `${auth.token_type} ${auth.access_token}`;
  }
}
