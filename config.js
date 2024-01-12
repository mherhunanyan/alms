require("dotenv").config();

const Config = {
  port: process.env.PORT ?? 3000,
  sessionSecret: process.env.SESSION_SECRET ?? "abc123",
  mongodbUrl:
    process.env.MONGODB_URL ??
    "mongodb://mher:mher@ac-ruk2cnv-shard-00-00.zi69puk.mongodb.net:27017,ac-ruk2cnv-shard-00-01.zi69puk.mongodb.net:27017,ac-ruk2cnv-shard-00-02.zi69puk.mongodb.net:27017/alms?ssl=true&replicaSet=atlas-11l2yc-shard-0&authSource=admin&retryWrites=true&w=majority",
};

module.exports = Config;
