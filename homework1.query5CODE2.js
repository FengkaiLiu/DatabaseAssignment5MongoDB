import { MongoClient } from 'mongodb';

async function createTweetsOnlyCollection() {
    const uri = 'mongodb://localhost:27017/';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('tweets'); // Assuming 'tweets' is the database name
        const tweetsCollection = database.collection('tweets');

        const agg = [
            {
                $project: {
                    user_id: "$user.id_str", // Reference the user's ID
                    text: 1,
                    created_at: 1,
                    // Include any other tweet fields you wish to retain, excluding the embedded user document
                }
            },
            {
                $out: "Tweets_Only" // Outputs the result to a new collection called Tweets_Only
            }
        ];

        // Running the aggregation pipeline
        const cursor = tweetsCollection.aggregate(agg);
        await cursor.toArray(); // Triggering the aggregation pipeline and awaiting its completion
        
        console.log('Tweets_Only collection has been created.');
    } catch (err) {
        console.error('An error occurred:', err);
    } finally {
        await client.close();
    }
}

createTweetsOnlyCollection().catch(console.error);

//******aggregation code */
// db.tweets.aggregate([
//     {
//       $project: {
//         user_id: "$user.id_str", 
//         text: 1,
//         created_at: 1,
//         
//       }
//     },
//     {
//       $out: "Tweets_Only"
//     }
//   ]);