import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$sort': {
      'followers_count': -1
    }
  }, {
    '$limit': 10
  }, {
    '$project': {
      'screen_name': 1, 
      'followers_count': 1
    }
  }
];

const client = await MongoClient.connect(
  'mongodb://localhost:27017/'
);
const coll = client.db('homework1').collection('tweets');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();