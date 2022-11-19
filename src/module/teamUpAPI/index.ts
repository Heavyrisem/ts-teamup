import axios, { AxiosInstance } from 'axios';

import { AuthInfo, AuthRequest, AuthResponse } from '~types/auth.interface';
import { HOST } from '~utils/constants';

import { EventAPI } from './event';
import { FeedAPI } from './feed';
import { MessageAPI } from './message';
import { RoomAPI } from './room';
import { UserAPI } from './user';

export class TeamUpAPI {
  private readonly axiosInstance: AxiosInstance;
  message: MessageAPI;
  room: RoomAPI;
  event: EventAPI;
  feed: FeedAPI;
  user: UserAPI;

  constructor(axiosInstance = axios.create()) {
    this.axiosInstance = axiosInstance;
    this.message = new MessageAPI(axiosInstance);
    this.room = new RoomAPI(axiosInstance);
    this.event = new EventAPI(axiosInstance);
    this.feed = new FeedAPI(axiosInstance);
    this.user = new UserAPI(axiosInstance);
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
    if (auth.error) throw new Error(`${auth.exception} ${auth.error} ${auth.error_description}`);

    this.axiosInstance.defaults.headers.Authorization = `${auth.token_type} ${auth.access_token}`;
  }
}
