// External Dependencies
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv'
// Global Variables

//export const collections: { users?: mongoDB.Collection } = {}
dotenv.config();
// @ts-ignore
const dbConnString = process.env.DB_CONN_STRING;

export async function connectToDatabase (dbConnString: string) {

    //dotenv.config();
 
    const client: MongoClient = new MongoClient(dbConnString, {
            serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
            }
      });
            
    await client.connect();
    return client
    //const db: mongoDB.Db = client.db(dbName);
   
//     const usersCollection: mongoDB.Collection = db.collection(usersCollectionName);
 
//   collections.users = usersCollection;
    //console.log("nice");
    //console.log(`Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`);

}


//client
