// External Dependencies
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv'

dotenv.config();
// @ts-ignore
const dbConnString = process.env.DB_CONN_STRING;

export async function connectToDatabase (dbConnString: string) {
    const client: MongoClient = new MongoClient(dbConnString, {
            serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
            }
      });
            
    await client.connect();
    return client
}
