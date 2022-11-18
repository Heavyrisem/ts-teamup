import { AxiosInstance } from 'axios';

import { UserInfo } from '~types/auth.interface';
import { HOST } from '~utils/constants';

export class UserAPI {
  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  /**
   * 사용자 정보 가져오기
   * @warn ⚠️ 공식 문서에 정의되지 않은 API, 사용 시 주의
   * @param user 사용자 번호
   * @param team 팀 번호
   */
  async getUser(user: number, team: number) {
    return this.axiosInstance
      .get<UserInfo>(`${HOST.AUTH}/v1/user/${user}/team/${team}`)
      .then((res) => res.data);
  }
}
