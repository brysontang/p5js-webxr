## p5js-webxr

**Warning: Extremely Experimental Code**

This project is in its earliest stages and is currently not documented. It's intended to be a way to render p5js code in WebXR by using threejs as a connector. Please be aware that everything here is subject to change without notice, including potential refactoring. This code is not yet ready for production use and should be approached with caution as it may contain bugs, security vulnerabilities, and other issues.

I am aware of the package [p5.xr](https://github.com/stalgiag/p5.xr), that project is not compatible with Apple devices, thus I created this project.

### Getting started

#### Install dependencies

First, ensure you have http-server installed. If not, install it with:

```bash
npm install -g http-server
```

Next, install grunt:

```bash
npm install -g grunt-cli
```

Then, install the project dependencies:

```bash
npm install
```

### Build the project

To build the project, run the following command:

```bash
grunt
```

#### Running the project

This project can be served on a computer and then viewed on a WebXR capable device, such as a smartphone or VR headset. To do so, you need to create a self-signed SSL certificate and serve the project using the http-server package.

##### Creating a self-signed SSL certificate

To make the project accessible on your local network and viewable in a browser on any device connected to that network, you need to create a self-signed SSL certificate. Use the command below to do so:

```bash
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365
```

##### Serving the project

You can run the project with the following command:

```bash
http-server -S -C cert.pem -K key.pem
```

The server will display two IP addresses. Use the first if you want to access the project on the same device, and the second if you want to access it on another device on the same network, such as a WebXR capable device. To see the example visit http://127.0.0.1:8080/example/.
