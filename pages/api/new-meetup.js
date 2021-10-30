import {MongoClient} from 'mongodb';
async function handler(req,res){
    if(req.method == 'POST'){
        const data = req.body ;
        const {title,image,address,description} = data ;
        const client = await MongoClient.connect('mongodb+srv://quang:123@cluster0.bfxk8.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(data);
        client.close();
        res.status(201).json({message:"Meet up started"});
    }
}
export default handler;