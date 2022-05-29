<h1 align="center">Welcome to video crud 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/video crud" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/video crud.svg">
  </a>
</p>

> NodeJs API for running crud operations on videos, user auth managed with Bearer token, Mongodb and running on Docker-compose. The Docker-compose runs an instance of the server, an instance of Mongodb and an instance of Nginx, for accessing to the api go to localhost:80/.

## Install

```sh
npm install
```

## Usage

For running the app locally, you can run it with ```sh npm start``` (if you have a mongodb instance running at port 27017, in case you want to run it using Docker just use ```sh docker-compose up```.

## Test

For running unit test, run the ```sh npm test``` command. The report will be generated at ```sh output/coverage/jest```

## API collection

The API collection can be imported in Postman, creating a new environment is needed and set the url to call, in case you run the app with ```Docker-compose``` it should be ```http://localhost```

## Author

👤 **Ramiro Clavijo**

* Github: [@ramc88](https://github.com/ramc88)