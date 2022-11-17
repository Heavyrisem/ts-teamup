export enum EventType {
  CHAT_MESSAGE = 'chat.message',
  CHAT_READ = 'chat.read',
  CHAT_DETACH = 'chat.detach',
  CHAT_JOIN = 'chat.join',
  CHAT_INITBOT = 'chat.initbot',
  FEED_FEED = 'feed.feed',
  FEED_REPLY = 'feed.reply',
  FEED_REMOVEFEED = 'feed.removefeed',
  FEEDGROUP_JOIN = 'feedgroup.join',
  INFORM_REMOVEFEED = 'inform.removefeed',
}

interface BaseEvent {
  type: EventType;
}

export interface Chat_Message extends BaseEvent {
  type: EventType.CHAT_MESSAGE;
  chat: {
    team: number;
    room: number;
    msg: number;
  };
  content?: string;
}

export interface Chat_Read extends BaseEvent {
  type: EventType.CHAT_READ;
  chat: {
    team: number;
    room: number;
  };
}

export interface Chat_Detach extends BaseEvent {
  type: EventType.CHAT_DETACH;
  chat: {
    team: number;
    room: number;
    user: number;
  };
}

export interface Chat_Join extends BaseEvent {
  type: EventType.CHAT_JOIN;
  chat: {
    team: number;
    room: number;
  };
}

export interface Chat_InitBot extends BaseEvent {
  type: EventType.CHAT_INITBOT;
  chat: {
    team: number;
    room: number;
    user: number;
    roomtype: number;
  };
}

export interface Feed_Feed extends BaseEvent {
  type: EventType.FEED_FEED;
  feed: {
    team: number;
    feed: number;
    feedgroup: number;
  };
}

export interface Feed_Reply extends BaseEvent {
  type: EventType.FEED_REPLY;
  feed: {
    team: number;
    reply: number;
    parent: number;
    feed: number;
    feedgroup: number;
  };
}

export interface Feed_RemoveFeed extends BaseEvent {
  type: EventType.FEED_REMOVEFEED;
  feed: {
    team: number;
    feed: number;
    feedgroup: number;
  };
}

export interface FeedGroup_Join extends BaseEvent {
  type: EventType.FEEDGROUP_JOIN;
  feedgroup: {
    team: number;
    feedgroup: number;
  };
}

export interface Inform_RemoveFeed extends BaseEvent {
  type: EventType.INFORM_REMOVEFEED;
  inform: {
    noti: number;
    read: number;
    watch: number;
  };
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
