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
}
