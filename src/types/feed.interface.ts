/** 지켜보기 (0:안함, 1:사용, type: feed.feed,tagfeed,reply,tagreply,watch) */
export type WatchType = 0 | 1;
/** 강제 알림 (0:안함, 1:사용, type: feed.feed,tagfeed) */
export type PushType = 0 | 1;
/** 알림탭 갱신 여부 (0:미참여, 1:최근 참여, 2:이전 참여, type: feed.reply,tagreply,like,likereply,removelikereply) */
export type InformType = 0 | 1 | 2;
/** 종류 (1:일반, 2:마크업) */
export type FeedType = 1 | 2;
/** 삭제 가능 여부 (0:불가, 1:가능) */
export type RemoveAble = 0 | 1;
/** 자신의 좋아요 여부 (0:안함, 1:함) */
export type Liked = 0 | 1;

export interface FeedEvent {
  /** 팀 번호 */
  team: number;
  /** 피드 그룹 번호 */
  feedgroup: number;
  /** 피드 번호 (0:그룹 전체) */
  feed: number;
  /** 유저 번호 (type: feed.feed,reply,like,tagfeed,tagreply,removelike,likereply,removelikereply) */
  user: number;
  /** 지켜보기 (0:안함, 1:사용, type: feed.feed,tagfeed,reply,tagreply,watch) */
  watch: WatchType;
  /** 강제 알림 (0:안함, 1:사용, type: feed.feed,tagfeed) */
  push: PushType;
  /** 댓글 번호 (type: feed.reply,tagreply,removereply,changereply,likereply,removelikereply) */
  reply: number;
  /** 상위 댓글 번호 (type: feed.reply,tagreply,removereply,changereply,likereply,removelikereply) */
  parent: number;
  /** 알림탭 갱신 여부 (0:미참여, 1:최근 참여, 2:이전 참여, type: feed.reply,tagreply,like,likereply,removelikereply) */
  inform: InformType;
}

export interface FeedGroupEvent {
  /** 팀 번호 */
  team: number;
  /** 피드 그룹 번호 */
  feedgroup: number;
}

export interface GetFeedsQuery {
  /** 팀 번호 */
  team: number;
  /** 피드 그룹 번호 */
  group: number;
  /** 유저 번호 */
  user: number;
  /**
   * 댓글 정보 포함 개수
   * Size range: 1-100
   */
  replycount: number;
  /**
   * 파일 정보 포함 개수
   * Size range: 1-100
   */
  filecount: number;
  /**
   * 파일 정보 포함 종류 (filecount와 함께 사용)
   * Allowed values: normal, media
   * */
  filetype: string;
}

export interface Feed {
  /** 팀 번호 */
  team: number;
  /** 피드 그룹 번호 */
  feedgroup: number;
  /** 피드 그룹 이름 */
  groupname: string;
  /** 피드 번호 */
  feed: number;
  /** 종류 (1:일반, 2:마크업) */
  type: FeedType;
  /** 유저 번호 */
  user: number;
  /** 강제 알림 (0:안함, 1:사용) */
  push: PushType;
  /** 내용 길이 (장문 여부 판단 - content 글자 수와 다르면 장문, utf8mb4) */
  len: number;
  /** 내용 */
  content: string;
  /** 삭제 가능 여부 (0:불가, 1:가능) */
  removable: RemoveAble;
  /** 생성시간(unix) */
  created: number;
  /** 지켜보기 (0:안함, 1:사용) */
  watch: WatchType;
  /** 자신의 좋아요 여부 (0:안함, 1:함) */
  liked: Liked;
  /** 태그 피드번호 (|로 구분, 비어있으면 태그 없음) */
  tagfeeds: string;
  /** 태그 유저번호 (|로 구분, 그룹 멤버만) */
  tagusers: string;
  /** 댓글 수 */
  replycount: number;
  /** 좋아요 수 */
  likecount: number;
  /** 전체 파일 수 */
  filecount: number;
  /** 미디어 파일 수 */
  mediacount: number;

  // FIXME: 너무 길어서 생략
}
export interface GetFeedsResponse {
  /** 피드 리스트 */
  feeds: Feed[];
}

export interface CreateFeedBody {
  type?: FeedType;
  /** 내용 */
  content: string;
  /** 강제 알림 (0:사용안함, 1:사용) Size range: 0-1 */
  push?: PushType;
  /** 태그 유저 번호 리스트 */
  tagusers?: number[];
  /** 태그 피드 번호 리스트 */
  tagfeeds?: number[];
  /** 파일 아이디 리스트 */
  ids?: string[];
}
export interface CreateFeedResponse {
  /** 피드 번호 */
  feed: number;
}

export interface Reply {
  /** 댓글 번호 */
  reply: number;
  /** 상위 댓글 번호 */
  parent: number;
  /** 유저 번호 (null:삭제) */
  user: number;
  /** 내용 길이 (장문 여부 판단 - content 글자 수와 다르면 장문, utf8mb4) */
  len: number;
  /** 내용 (null:삭제) */
  content: string;
  /** 삭제 가능 여부 (0:불가, 1:가능) */
  removable: RemoveAble;
  /** 자신의 좋아요 여부 (0:안함, 1:함) */
  liked: Liked;
  /** 좋아요 수 */
  likecount: number;
  /** 전체 파일 수 */
  filecount: number;
  /** 태그 피드번호 (|로 구분, 비어있으면 태그 없음) */
  tagfeeds: string;
  /** 태그 유저번호 (|로 구분, 그룹 멤버만) */
  tagusers: string;
  /** 생성시간(unix) */
  created: number;
}
export interface GetRepliesResponse {
  replies: Reply[];
}

export interface CreateReplyBody {
  /** 상위 댓글 번호 */
  parent?: number;
  /** 내용 */
  content: string;
  /** 태그 유저 번호 리스트 */
  tagusers?: number[];
  /** 태그 피드 번호 리스트 */
  tagfeeds?: number[];
  /** 파일 아이디 */
  id?: string;
}
export interface CreateReplyResponse {
  /** 댓글 번호 */
  reply: number;
  /** 상위 댓글 번호 */
  parent: number;
}
