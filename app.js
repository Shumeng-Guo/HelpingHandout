import express from 'express';
import test from './test.js';
import cors from "cors";
const PORT = 4000;

const app = express();
// app.use(express.json());
app.use(cors());

test(app);

app.get('/start', (req, res) => {res.send("HelpingHandout server is up and running!")})
// app.listen(4000)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });