import express from 'express';
import test from './test.js';
import cors from "cors";
import bodyParser from "body-parser";
import { promises as fs } from 'fs';

const PORT = 4000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
app.use(cors());

test(app);

app.get('/', (req, res) => {res.send("HelpingHandout server is up and running!")})
// app.listen(4000)


let listingsData = [];
const loadListingData = async () => {
  try {
    const rawData = await fs.readFile('./data/Listings.json', 'utf8');
    listingsData = JSON.parse(rawData);
  } catch (error) {
    console.error('Error loading listings data:', error);
  }
};
loadListingData()

let eventsData = [];
const loadEventData = async () => {
  try {
    const rawData = await fs.readFile('./data/Events.json', 'utf8');
    eventsData = JSON.parse(rawData);
  } catch (error) {
    console.error('Error loading events data:', error);
  }
};
loadEventData()

let flashVolunteersData = [];
const loadVolunteerData = async () => {
  try {
    const rawData = await fs.readFile('./data/Volunteers.json', 'utf8');
    flashVolunteersData = JSON.parse(rawData);
  } catch (error) {
    console.error('Error loading volunteers data:', error);
  }
};
loadVolunteerData()




app.get('/listings', async (req, res) => {
  // console.log(`You reached the listings page. What is ${req.query.paramWhat} and where is ${req.query.paramWhere}`);
  console.log(listingsData);
  res.json(listingsData);
});


function searchListings(what, where) {
  return listingsData.filter((listing) => {
    return listing.category.toLowerCase().includes(what.toLowerCase()) && listing.zipcode.includes(where);
  });
}

app.get('/listings/search', (req, res) => {
  const what = req.query.paramWhat;
  const where = req.query.paramWhere;
  console.log(`You reached the listings page. What is ${what} and where is ${where}`);
  console.log(listingsData);

  try {
    const results = searchListings(what, where);
    console.log(results);
    res.json(results);
  } catch (error) {
    console.error('Error searching listings:', error);
    res.status(500).send('Server error while searching listings');
  }
});


app.get('/volunteerwithus/events', async (req, res) => {
  res.json(eventsData);
});


app.get('/volunteerwithus', async (req, res) => {
  res.json(flashVolunteersData);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });