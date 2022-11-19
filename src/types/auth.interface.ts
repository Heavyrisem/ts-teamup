export interface AuthInfo {
  client_id: string;
  client_secret: string;
  username: string;
  password: string;
}

export interface AuthRequest extends AuthInfo {
  grant_type: 'password';
}

export interface AuthResponse {
  access_token: string;
  expires_in: number;
  token_type: 'bearer';
  refresh_token: string;
  error?: string;
  exception?: string;
  error_description?: string;
}

export interface UserInfo {
  /** 유저 번호 */
  index: number;
  /** 유저 이름 */
  name: string;
  /** 이메일 */
  email: string;
  /** 이미지 URL */
  profile_image: string;
  /** 상태 메시지 */
  message: string;
  /** 유저 상태
   * Allowed values: approval, exit, block
   */
  status: 'approval' | 'exit' | 'block';
  /** 휴면계정 여부 */
  is_active: boolean;
  /** 봇 여부 */
  is_bot: boolean;
  /** 휴대전화 */
  mobile: string;
  /** 직통전화 */
  phone: string;
  /** 생년월일 */
  birthday: string;
  /** 생년월일 음력 여부 */
  is_lunar: boolean;
  /** 직급 이름 */
  position: string;
  /** 직책 이름 */
  job_title: string;
  /** 사용자 상태 */
  user_status: string;
  /** 사용자 상태 메모 */
  memo: string;
  /** 소속 부서 정보 */
  department: {
    /** 부서 번호 */
    index?: number;
    /** 부서 이름 */
    name?: string;
    /** 상위 부서 번호 */
    parent?: number;
  };
}
