import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const filter = {
  '$nor': [
    {
      'retweeted_status': {
        '$exists': true, 
        '$type': 'object'
      }
    }, {
      'in_reply_to_status_id': {
        '$exists': true, 
        '$type': 'number'
      }
    }
  ]
};

const client = await MongoClient.connect(
  'mongodb://localhost:27017/'
);
const coll = client.db('homework1').collection('tweets');
const cursor = coll.find(filter);
const result = await cursor.toArray();
await client.close();

//***Query Aggregation */
// db.users.aggregate[
//   {
//     '$match': {
//       '$nor': [
//         {
//           'retweeted_status': {
//             '$exists': true,
//             '$type': 'object'
//           }
//         }, {
//           'in_reply_to_status_id': {
//             '$exists': true,
//             '$type': 'number'
//           }
//         }
//       ]
//         }
//   }, {
//     '$count': 'tweets'
//   }
// ]