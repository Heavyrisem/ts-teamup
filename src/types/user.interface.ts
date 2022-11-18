export interface User {
  /** 유저 번호 (type: user.password,drop) */
  user: number;
  /** 팀 번호 (type: user.approval,exit,block) */
  team: number;
  /** 유저 번호 리스트 (type: user.approval,exit,block) */
  users: number[];
}
