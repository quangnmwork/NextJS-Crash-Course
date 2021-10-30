import React from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient } from "mongodb";
function MeetupDetails (props) {
    return <MeetupDetail image = {props.meetupData.image}
    title = {props.meetupData.title}
    address = {props.meetupData.address}
    description = {props.meetupData.description}/>
}
export async function getStaticPaths(){
    const client = await MongoClient.connect('mongodb+srv://quang:123@cluster0.bfxk8.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find({},{_id:1}).toArray();
    client.close();
    return {
        fallback:false,
        paths:meetups.map(meetup => ({params:{meetupId:meetup._id.toString()}}))
        // [
        //     {
        //         params:{
        //             meetupId:'m1'
        //         }
        //     },
        //     {
        //         params:{
        //             meetupId:'m2'
        //         }
        //     }
        // ]
    }
}
export async function getStaticProps(context){
    const meetUpId = context.params.meetupId;
    const client = await MongoClient.connect('mongodb+srv://quang:123@cluster0.bfxk8.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const selectedMeetup = await meetupsCollection.findOne({_id:meetUpId});
    client.close();
    return { 
        meetupData:selectedMeetup
    }
}
export default MeetupDetails;