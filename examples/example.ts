import { resolve } from 'path';

import { config } from 'dotenv';

import { AuthInfo, EventType, TeamUP } from '../dist';

config({ path: resolve(`${__dirname}/../.env`) });

const auth: AuthInfo = {
  username: process.env.id as string,
  password: process.env.password as string,
  client_id: process.env.client_id as string,
  client_secret: process.env.client_secret as string,
};
const bot = new TeamUP();
console.log(auth);

bot.onReady(async () => {
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
  const feed = await bot.feed.getFeed(event.feed.feed);
  console.log(feed);

  if (feed.feedgroup === 86265) {
    await bot.feed.likeFeed(event.feed.feed);
    await bot.feed.createReply(event.feed.feed, {
      content: 'feed reply test',
    });
    await bot.feed.createFeed(86265, {
      content: 'create feed test',
    });

    const { room } = await bot.room.createRoom(feed.team, [feed.user]);
    await bot.message.sendMessage(room, {
      content: 'send message test',
    });
  }

  if (feed.type === 2) {
    const feedContent = await bot.feed.getMarkup(event.feed.feed);
    console.log(feedContent);
  }
});

bot.run(auth);
