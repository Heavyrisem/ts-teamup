import { config } from 'dotenv';

import { TeamUP } from '../dist';
import { AuthInfo } from '../dist/types/auth.interface';
import { EventType } from '../dist/types/event.interface';

config({ path: `${__dirname}/../.env` });

const auth: AuthInfo = {
  username: process.env.username as string,
  password: process.env.password as string,
  client_id: process.env.client_id as string,
  client_secret: process.env.client_secret as string,
};
const bot = new TeamUP();
console.log(auth);

bot.onReady(() => {
  console.log('Bot is Ready');
});

bot.addHandler(EventType.CHAT_MESSAGE, async (event) => {
  const room = await bot.room.getRoomDetail(event.chat.room);
  const user = await bot.user.getUser(event.chat.user, event.chat.team);
  console.log(event, room, user);

  if (event.content?.startsWith('!')) {
    const sendresult = await bot.message.sendMessage(event.chat.room, {
      content: event.content?.replace('!', ''),
    });

    console.log(sendresult);
  }
});

bot.addHandler(EventType.FEEDGROUP_JOIN, async (event) => {
  console.log(event);
});

bot.addHandler(EventType.FEED_FEED, async (event) => {
  console.log(event.feed);
});

bot.run(auth);
