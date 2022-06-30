## JACDAC on Node.js with TypeScript

This example reads accelerometer, prints 3-axis data in the console and display a smile face on the LED screen when you shake it.

See [this](https://microsoft.github.io/jacdac-docs/clients/makecode/servers/) for how to flash JACDAC firmware onto your micro:bit V2. Or you can directly flash with the .hex in this project (which enables accelerometer and LED screen services on micro:bit V2).

See the [Medium](https://alankrantas.medium.com/interfacing-jacdac-services-on-bbc-micro-bit-w-node-js-typescript-e39fc17a768) article for details.

### Setup

Requires Node.js:

```
npm install
```

### Run ```/src/index.ts```

```
npm start
```

Or

```
npx tsc-watch --onsuccess "node ./dist/index.js"
```
