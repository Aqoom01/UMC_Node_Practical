import express from 'express';
import dotenv from "dotenv";

// 엔드포인트 import
import { handleUserSignup } from './controllers/user.controller.js';

dotenv.config();

const app = express()
const port = process.env.PORT;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post("/users/signup", handleUserSignup);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
