## p5js-threejs-webxr

**Warning: Extremely Experimental Code**

This project is in its earliest stages and is currently not documented. It's intended to be a way to render p5js code in WebXR by using threejs as a connector. Please be aware that everything here is subject to change without notice, including potential refactoring. This code is not yet ready for production use and should be approached with caution.

### Getting started

#### Install dependencies

First, ensure you have http-server installed. If not, install it with

```bash
npm install -g http-server
```

#### Creating a self-signed SSL certificate

To make the project accessible on your local network and viewable in a browser on any device connected to that network, you need to create a self-signed SSL certificate. Use the command below to do so:

```bash
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365
```

#### Running the project

Once you have the SSL certificate, you can run the project with the following command:

```bash
http-server -S -C cert.pem -K key.pem
```

The server will display two IP addresses. Use the first if you want to access the project on the same device, and the second if you want to access it on another device on the same network, such as a WebXR capable device.
