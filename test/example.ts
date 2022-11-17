import { config } from 'dotenv';

import { TeamUP } from '../dist';
import { AuthInfo } from '../dist/types/auth';
import { EventType } from '../dist/types/event';

config({ path: `${__dirname}/../.env` });

const auth: AuthInfo = {
  username: process.env.username as string,
  password: process.env.password as string,
  client_id: process.env.client_id as string,
  client_secret: process.env.client_secret as string,
};
const bot = new TeamUP();
console.log(auth);

bot.addHandler(EventType.CHAT_MESSAGE, async (event) => {
  console.log(event);
  if (event.content?.startsWith('!')) {
    const sendresult = await bot.message.sendMessage(event.chat.room, {
      content: event.content?.replace('!', ''),
    });

    console.log(sendresult);
  }
});

bot.run(auth);
