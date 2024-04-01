import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
    {
        $group: {
            _id: "$user.screen_name", // Assume the user's screen name is under 'user.screen_name'
            totalTweets: { $sum: 1 },
            averageRetweets: { $avg: "$retweet_count" }
        }
    },
    {
        $match: {
            totalTweets: { $gt: 3 } // Users who have tweeted more than 3 times
        }
    },
    {
        $sort: {
            averageRetweets: -1 // Sort by average retweets in descending order
        }
    },
    {
        $limit: 10 // Limit to top 10
    },
    {
        $project: {
            _id: 0, // Exclude the _id field from the results
            screen_name: "$_id", // Show the screen name
            averageRetweets: 1 // Include the average retweets
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