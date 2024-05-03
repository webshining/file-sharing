import { createClient } from "redis";
import { REDIS_URI } from "./data/config";

const client = createClient({ url: REDIS_URI });
client.on("error", (err) => console.log("Redis Client Error", err));

export default client;
