// External Dependencies
import * as mongoDB from "mongodb";
import dotenv from 'dotenv'
// Global Variables

//export const collections: { users?: mongoDB.Collection } = {}
dotenv.config();
const dbConnString = process.env.DB_CONN_STRING;

export async function connectToDatabase (dbConnString: string) {

    //dotenv.config();
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbConnString, {
        ssl: true // Ensure TLS/SSL is enabled
      });
            
    await client.connect();
    return client
    //const db: mongoDB.Db = client.db(dbName);
   
//     const usersCollection: mongoDB.Collection = db.collection(usersCollectionName);
 
//   collections.users = usersCollection;
    //console.log("nice");
    //console.log(`Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`);

}

let connection=connectToDatabase(dbConnString!);


console.log("connection achieved", connection);


//client