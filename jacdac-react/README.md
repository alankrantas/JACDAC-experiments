## JACDAC on React with TypeScript

This is a showcase app that allows you to browse JACDAC devices and its services in an interactive way. The app is built with React and Bootstrap.

You can implement a service component and import it into ```/src/component/serviceOperator.tsx```, adding it in the switch/case. There are four services I've already implemented:

* Temperature
* Accelerometer
* Sound level
* Screen (dot matrix)

If ```serviceOperator``` cannot find a component for a specific service, it will use ```/src/component/serviceSpec.tsx``` instead.

See [this](https://microsoft.github.io/jacdac-docs/clients/makecode/servers/) for how to flash JACDAC firmware onto your micro:bit V2. Or you can directly flash with the .hex in this project (which enables four services on micro:bit V2).

See the [Medium](https://alankrantas.medium.com/build-a-react-app-to-interact-with-jacdac-services-on-bbc-micro-bit-dbdcd70567b7) article for details.

### Setup

Requires Node.js:

```
npm install
```

### Start Dev Server

```
npm start
```

### Serve Production

```
npm run build
npm i -g http-server
http-server ./build
```
