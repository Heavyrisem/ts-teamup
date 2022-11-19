# TeamUP API

## Description

[TeamUP](https://http://team-up.github.io/) API Wrapper for nodejs

## Installation

```bash
$ npm install ts-teamup
or
$ yarn add ts-teamup
```

## Usage

```typescript
const bot = new TeamUP(); // Create Bot Client

...
bot.addHandler(EventType, callback); // add event handler
...

bot.run(auth); // start bot with authentication info

```
