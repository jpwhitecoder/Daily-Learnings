import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
console.log("MONGODB_URI:", process.env.MONGODB_URI);
const client = new MongoClient(process.env.MONGODB_URI!);

const db = client.db();

export const auth = betterAuth({
    database: mongodbAdapter(db,{
        client,
    }),
    emailAndPassword: { 
        enabled: true, 
    },
});
