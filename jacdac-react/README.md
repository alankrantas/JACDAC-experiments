## JACDAC Demo on React with TypeScript

Reading micro:bit sensor data using JACDAC's [React package](https://microsoft.github.io/jacdac-docs/clients/javascript/react/). The React app supports the following four sensors:

* Temperature
* Accelerometer
* Sound level
* Screen (dot matrix)

For other sensors, the default sensor spec data would be displayed.

### Firmware

The [JACDAC firmware](https://microsoft.github.io/jacdac-docs/clients/makecode/servers/) for the micro:bit should start all four services:

```js
jacdac.startServer()
servers.startServer(servers.accelerometerServer)
servers.startServer(servers.soundLevelServer)
servers.startServer(servers.screenServer)
servers.startServer(servers.temperatureServer)
```

If ```serviceOperator``` cannot find a component for a specific service, it will use ```/src/component/serviceSpec.tsx``` instead.

### Setup

> Requires Node.js

```
npm i -g yarn
yarn
```

### Start developing server

> Make sure your micro:bit is disconnected from MakeCode or other apps

```
yarn start
```

### Serve production site

```
yarn run build
```

Then

```
npm i -g http-server
http-server ./build
```

And open ```http://localhost:8080```.

Or you can serve the ```build``` directory in any static HTTP server.
