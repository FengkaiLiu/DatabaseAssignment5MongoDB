import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$group': {
      '_id': '$user.screen_name', 
      'tweetCount': {
        '$sum': 1
      }
    }
  }, {
    '$sort': {
      'tweetCount': -1
    }
  }, {
    '$limit': 1
  }, {
    '$project': {
      '_id': 0, 
      'screen_name': '$_id', 
      'tweetCount': 1
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