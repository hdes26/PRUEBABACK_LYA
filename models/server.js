const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
const path = require("path");

//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
  definition:{
    openapi:"3.0.0",
    info:{
      title:"Node Prueba Lya",
      version:"1.0.0"
    },
    servers:[
      {
        url:`http://localhost:${process.env.PORT}`
      },
    ],
  },
  apis:[`${path.join(__dirname, "../routes/*.js")}`],
};

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth:     "/authorization",
      users:    "/users",
      messages: "/messages",
      swagger:  "/api-doc"
    };

    //Conectar a base de datos
    this.conectarDB();

    //Middlewares
    this.middlewares();

    // Rutas
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    // Parseo y lectura del body
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth.routes"));
    this.app.use(this.paths.users, require("../routes/user.routes"));
    this.app.use(this.paths.messages, require("../routes/message.routes"));
    this.app.use(this.paths.swagger,swaggerUI.serve,swaggerUI.setup(swaggerJsDoc(swaggerSpec)));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on the port", this.port);
    });
  }
}

module.exports = Server;
