import { AxiosError } from 'axios';

import { TeamUpAPI } from '~module/teamUpAPI';
import { AuthInfo } from '~types/auth.interface';
import { EventHandlerFunction, STATUS } from '~types/bot.interface';
import { EventType, EventMap } from '~types/event.interface';

export class TeamUP extends TeamUpAPI {
  private handler: { [key in EventType]?: EventHandlerFunction };
  status: STATUS;
  readyHandler: () => void;

  constructor() {
    super();
    this.status = STATUS.OFFLINE;
    this.handler = {};
    this.readyHandler = () => null;
  }

  private async main() {
    this.status = STATUS.ONLINE;
    this.readyHandler();
    while (this.status === STATUS.ONLINE) {
      try {
        const { events } = await this.event.getEvent();

        events.forEach((event) => {
          const handlerFunction = this.handler[event.type];

          if (handlerFunction) {
            this.eventHandler(event, handlerFunction);
          }
        });
      } catch (err) {
        this.status = STATUS.ERROR;
        if (err instanceof AxiosError) {
          console.log(err.message);
          // console.log(err);
        }
        throw err;
      }
    }
  }

  private async eventHandler<K extends keyof EventMap>(
    event: EventMap[K],
    callback: EventHandlerFunction<EventMap[K]>,
  ) {
    const data = event;

    switch (event.type) {
      case EventType.CHAT_MESSAGE: {
        const { room, msg } = event.chat;
        const content = await this.message.getMessage(room, msg);
        callback({ ...data, content });
        break;
      }
      default:
        callback(data);
    }
  }

  addHandler<K extends keyof EventMap>(type: K, callback: EventHandlerFunction<EventMap[K]>) {
    this.handler[type] = callback;
  }

  onReady(callback: () => void) {
    this.readyHandler = callback;
  }

  async run(userAuth: AuthInfo) {
    this.status = STATUS.UNAUTHORIZED;
    // console.log('Login...');
    await this.login(userAuth);
    // console.log('Login success');

    this.main();
  }
}

export * from './types';
