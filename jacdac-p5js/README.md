## JACDAC Demo on p5.js

Reading micro:bit sensor data using JACDAC's [p5.js library](https://microsoft.github.io/jacdac-docs/clients/javascript/p5js/).

### Firmware

The [JACDAC firmware](https://microsoft.github.io/jacdac-docs/clients/makecode/servers/) for the micro:bit should start one services (accelerometer):

```js
jacdac.startServer()
servers.startServer(servers.accelerometerServer)
```

### Run script

> Requires Node.js

```
npm i -g http-server
http-server ./
```

Then open ```http://localhost:8080```.

Or you can serve ```index.html``` and ```sketch.js``` in any static HTTP server.
