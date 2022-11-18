import { FeedEvent, FeedGroupEvent } from './feed.interface';
import { InformEvent } from './inform.interface';
import { ChatEvent } from './message.interface';

/**
 * @ 이벤트 종류 prefix (chat.:채팅, feed.:피드, feedgroup.:피드 그룹, inform.:알림, user.:유저, etc.:기타)
 * @ 이벤트 종류 prefix 로 정보 데이터 반환 (ex: {"type":"chat.message","chat":{Object}})
 * @ 채팅 type: chat.(message:메시지, read:읽음, detach:퇴장, join:초대, room:대화방 설정 변경, initbot:봇 초기화 메세지)
 * @ 피드 type: feed.(feed:새글, reply:댓글, like:좋아요, likereply:댓글 좋아요, tagfeed:태그 글, tagreply:태그 댓글, removefeed:글 삭제, removereply:댓글 삭제, removelike:좋아요 삭제, removelikereply:댓글 좋아요 삭제, changefeed:글 수정, changereply:댓글 수정, watch:지켜보기)
 * @ 피드 그룹 type: feedgroup. (join:생성/초대/새 멤버, detach:탈퇴, admin:관리자 변경, config:설정)
 * @ 알림 type: inform. (removefeed:피드 알림 삭제, readfeed:피드 읽음 상태 변경)
 * @ 유저 type: user. (password:패스워드, approval:팀 가입, exit:팀 탈퇴, block:팀 중지, drop: 계정 삭제)
 * @ 기타 type: etc. (transfer: p2p 전송)
 */
export enum EventType {
  /** 메시지 */
  CHAT_MESSAGE = 'chat.message',
  /** 읽음 */
  CHAT_READ = 'chat.read',
  /** 퇴장 */
  CHAT_DETACH = 'chat.detach',
  /** 초대 */
  CHAT_JOIN = 'chat.join',
  /** 대화방 설정 변경 */
  CHAT_ROOM = 'chat.room',
  /** 봇 초기화 메세지 */
  CHAT_INITBOT = 'chat.initbot',
  /** 새글 */
  FEED_FEED = 'feed.feed',
  /** 댓글 */
  FEED_REPLY = 'feed.reply',
  /** 좋아요 */
  FEED_LIKE = 'feed.like',
  /** 댓글 좋아요 */
  FEED_LIKEREPLY = 'feed.likereply',
  /** 태그 글 */
  FEED_TAGFEED = 'feed.tagfeed',
  /** 태그 댓글 */
  FEED_TAGREPLY = 'feed.tagreply',
  /** 글 삭제 */
  FEED_REMOVEFEED = 'feed.removefeed',
  /** 댓글 삭제 */
  FEED_REMOVEREPLY = 'feed.removereply',
  /** 좋아요 삭제 */
  FEED_REMOVELIKE = 'feed.removelike',
  /** 댓글 좋아요 삭제 */
  FEED_REMOVELIKEREPLY = 'feed.removelikereply',
  /** 글 수정 */
  FEED_CHANGEFEED = 'feed.changefeed',
  /** 댓글 수정 */
  FEED_CHANGEREPLY = 'feed.changereply',
  /** 지켜보기 */
  FEED_WATCH = 'feed.watch',
  /** 생성/초대/새 멤버 */
  FEEDGROUP_JOIN = 'feedgroup.join',
  /** 탈퇴 */
  FEEDGROUP_DETACH = 'feedgroup.detach',
  /** 관리자 변경 */
  FEEDGROUP_ADMIN = 'feedgroup.admin',
  /** 설정 */
  FEEDGROUP_CONFIG = 'feedgroup.config',
  /** 피드 알림 삭제 */
  INFORM_REMOVEFEED = 'inform.removefeed',
  /** 피드 읽음 상태 변경 */
  INFORM_READFEED = 'inform.readfeed',
  /** 패스워드 */
  USER_PASSWORD = 'user.password',
  /** 팀 가입 */
  USER_APPROVAL = 'user.approval',
  /** 팀 탈퇴 */
  USER_EXIT = 'user.exit',
  /** 팀 중지 */
  USER_BLOCK = 'user.block',
  /** 계정 삭제 */
  USER_DROP = 'user.drop',
  /** p2p 전송 */
  ETC_TRANSFER = 'etc.transfer',
}

interface BaseEvent {
  type: EventType | string;
  /** 채팅 이벤트 정보 (type: chat.*) */
  chat?: Partial<ChatEvent>;
  /** 피드 이벤트 정보 (type: feed.*) */
  feed?: Partial<FeedEvent>;
  /** 피드 그룹 이벤트 정보 (type: feedgroup.*) */
  feedgroup?: Partial<FeedGroupEvent>;
  /** 알림 이벤트 정보 (type: inform.*) */
  inform?: Partial<InformEvent>;
}

export interface Chat_Message extends BaseEvent {
  type: EventType.CHAT_MESSAGE;
  chat: Pick<ChatEvent, 'team' | 'room' | 'msg' | 'type' | 'user'>;
  content?: string;
}
export interface Chat_Read extends BaseEvent {
  type: EventType.CHAT_READ;
  chat: Pick<ChatEvent, 'team' | 'room'>;
}

export interface Chat_Detach extends BaseEvent {
  type: EventType.CHAT_DETACH;
  chat: Pick<ChatEvent, 'team' | 'room' | 'user'>;
}

export interface Chat_Join extends BaseEvent {
  type: EventType.CHAT_JOIN;
  chat: Pick<ChatEvent, 'team' | 'room'>;
}

export interface Chat_InitBot extends BaseEvent {
  type: EventType.CHAT_INITBOT;
  chat: Pick<ChatEvent, 'team' | 'room' | 'user' | 'roomtype'>;
}

export interface Feed_Feed extends BaseEvent {
  type: EventType.FEED_FEED;
  feed: Pick<FeedEvent, 'team' | 'reply' | 'parent' | 'feed' | 'feedgroup'>;
}

export interface Feed_Reply extends BaseEvent {
  type: EventType.FEED_REPLY;
  feed: Pick<FeedEvent, 'team' | 'reply' | 'parent' | 'feed' | 'feedgroup'>;
}

export interface Feed_RemoveFeed extends BaseEvent {
  type: EventType.FEED_REMOVEFEED;
  feed: Pick<FeedEvent, 'team' | 'feed' | 'feedgroup'>;
}

export interface FeedGroup_Join extends BaseEvent {
  type: EventType.FEEDGROUP_JOIN;
  feedgroup: Pick<FeedGroupEvent, 'team' | 'feedgroup'>;
}

export interface Inform_RemoveFeed extends BaseEvent {
  type: EventType.INFORM_REMOVEFEED;
  inform: Pick<InformEvent, 'noti' | 'read' | 'watch'>;
}

// =======================================================

export type Event =
  | Chat_Message
  | Chat_Read
  | Chat_Detach
  | Chat_InitBot
  | Feed_Feed
  | Feed_Reply
  | Feed_RemoveFeed
  | FeedGroup_Join
  | Inform_RemoveFeed;

export interface EventMap {
  [EventType.CHAT_MESSAGE]: Chat_Message;
  [EventType.CHAT_READ]: Chat_Read;
  [EventType.CHAT_DETACH]: Chat_Detach;
  [EventType.CHAT_INITBOT]: Chat_InitBot;
  [EventType.FEED_FEED]: Feed_Feed;
  [EventType.FEED_REPLY]: Feed_Reply;
  [EventType.FEED_REMOVEFEED]: Feed_RemoveFeed;
  [EventType.FEEDGROUP_JOIN]: FeedGroup_Join;
  [EventType.INFORM_REMOVEFEED]: Inform_RemoveFeed;
}

export interface EventResponse {
  events: Event[];
}
