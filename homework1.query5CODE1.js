import { MongoClient } from 'mongodb';

async function createUserCollection() {
  const client = new MongoClient('mongodb://localhost:27017/');
  try {
    await client.connect();
    const db = client.db('tweets');
    const usersAggregation = [
      {
        $group: {
          _id: "$user.id_str", // Adjust field path as necessary
          userDoc: { $first: "$user" }
        }
      },
      {
        $replaceRoot: { newRoot: "$userDoc" }
      },
      {
        $out: "Users"
      }
    ];

    await db.collection('tweets').aggregate(usersAggregation).toArray();
    console.log('Users collection created with unique users.');
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

createUserCollection();

//*******aggregation code
// db.tweets.aggregate([
//     {
//       $group: {
//         _id: "$user.id_str",
//         userDoc: { $first: "$user" } 
//       }
//     },
//     {
//       $replaceRoot: { newRoot: "$userDoc" } 
//     },
//     {
//       $out: "Users" 
//     }
//   ]);