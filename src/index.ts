import { AxiosError } from 'axios';

import { TeamUpAPI } from '~module/teamUpAPI';
import { AuthInfo } from '~types/auth';
import { EventHandlerFunction, STATUS } from '~types/bot';
import { EventType, EventMap } from '~types/event';

export class TeamUP extends TeamUpAPI {
  private handler: { [key in EventType]?: EventHandlerFunction };
  status: STATUS;

  constructor() {
    super();
    this.status = STATUS.OFFLINE;
    this.handler = {};
  }

  private async main() {
    console.log('Bot is Running');
    this.status = STATUS.ONLINE;
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
      }
    }
    console.log('Bot is Exiting');
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

  async run(userAuth: AuthInfo) {
    this.status = STATUS.UNAUTHORIZED;
    console.log('Login...');
    await this.login(userAuth);
    console.log('Login success');

    this.main();
  }
}
