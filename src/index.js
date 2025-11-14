import express from 'express';
import dotenv from "dotenv";
import cors from "cors";

// 엔드포인트 import
import { 
  handleUserSignup,
  handleUserReviews
} from './controllers/user.controller.js';
import { handleListStoreReviews } from './services/store.service.js';
import { StatusCodes } from 'http-status-codes';

dotenv.config();

const app = express()
const port = process.env.PORT;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('json replacer', (key, value) =>
  typeof value === 'bigint' ? parseInt(value) : value
);

app.use((req, res, next) => {
  res.success = (data, statusCode = StatusCodes.OK) => {
    return res.status(statusCode).json({
      success: true,
      code: statusCode,
      data,
    });
  };

  res.error = ({
    statusCode = 500,
    errorCode = "unknown",
    reason = null,
    data = null,
  } = {}) => {
    return res.status(statusCode).json({
      success: false,
      code: errorCode,
      reason,
      data,
    });
  };

  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})


// 5주차 실습
app.post("/users/signup", handleUserSignup);

// 6주차 실습 - 페이지네이션
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);

// 6주차 미션(1)
app.get("/mypage/reviews", handleUserReviews);


app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
