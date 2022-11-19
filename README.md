# TeamUP API

<div align="left">
    <a href="https://github.com/Heavyrisem/ts-teamup/actions/workflows/publish.yml">
        <img src="https://github.com/Heavyrisem/ts-teamup/actions/workflows/publish.yml/badge.svg">
    </a>
    <a href="https://badge.fury.io/js/ts-teamup">
        <img src="https://badge.fury.io/js/ts-teamup.svg">
    </a>
</div>

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
