import MeetupList from '../components/meetups/MeetupList';
import React,{useState,useEffect} from 'react';
import { MongoClient } from 'mongodb';
const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a first meetup!'
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 10, 12345 Some City',
    description: 'This is a second meetup!'
  }
];

function HomePage(props) {
  const [loadedMeetups,setLoadedMeetups] = useState([]);
  useEffect(
    () => {
      setLoadedMeetups(DUMMY_MEETUPS);
    },[])
  return (
  
          <MeetupList meetups={props.meet_ups} />
      
  )
}
export async function getStaticProps(){
  const client = await MongoClient.connect('mongodb+srv://quang:123@cluster0.bfxk8.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props:{
      meet_ups:meetups.map(meetup => ({
        title:meetup.title, 
        description:meetup.description, 
        image:meetup.image,
        id:meetup._id.toString()
      })),
    },
    revalidate:10
  }
}

export default HomePage;