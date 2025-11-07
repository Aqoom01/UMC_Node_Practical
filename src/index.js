import express from 'express';
import dotenv from "dotenv";
import cors from "cors";

// 엔드포인트 import
import { handleUserSignup } from './controllers/user.controller.js';
import { handleListStoreReviews } from './services/store.service.js';

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


// 5주차 실습
app.post("/users/signup", handleUserSignup);

// 6주차 실습 - 페이지네이션
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
