/** 읽음 상태 (0:전체, 1:읽은 알림만, type: inform.removefeed) */
export type ReadType = 0 | 1;
/** 지켜보기 (0:일반, 1:지켜보기, type: inform.removefeed) */
export type InformWatchType = 0 | 1;

export interface InformEvent {
  /** 피드 그룹 번호 (0:알림 전체) */
  feedgroup: number;
  /** 피드 번호 (0:그룹 전체) */
  feed: number;
  /** 알림 번호 (0:전체) */
  noti: number;
  /** 읽음 상태 (0:전체, 1:읽은 알림만, type: inform.removefeed) */
  read: ReadType;
  /** 지켜보기 (0:일반, 1:지켜보기, type: inform.removefeed) */
  watch: InformWatchType;
}
