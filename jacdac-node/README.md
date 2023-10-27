## JACDAC Demo on Node.js with TypeScript

Reading micro:bit sensor data using JACDAC's [JDOM library](https://microsoft.github.io/jacdac-docs/clients/javascript/jdom/) in Node.js.

### Firmware

The [JACDAC firmware](https://microsoft.github.io/jacdac-docs/clients/makecode/servers/) for the micro:bit should start two services (accelerometer and LED screen):

```js
jacdac.startServer()
servers.startServer(servers.accelerometerServer)
servers.startServer(servers.screenServer)
```

If the script cannot detect either services, the script will stop.

### Setup

> Requires Node.js

```
npm i -g yarn
yarn
```

### Run script

> Make sure your micro:bit is disconnected from MakeCode or other apps

```
yarn start
```

The running script will update itself after you save new changes to `index.ts`. Press ```Ctrl + C``` in the console to stop the script.
