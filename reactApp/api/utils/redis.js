import redis from "redis";

import { createClient } from "redis";

export const client = createClient({
  password: "HYqL2PkMROutpGpeqi2rUur8mvpW6e2v",
  socket: {
    host: "redis-13158.c212.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 13158,
  },
});

client.on("connect", function () {
  console.log("Connected to Redis");
});

client.on("error", function (err) {
  console.log("Error connecting to Redis:", err);
});
