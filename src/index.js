import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import swaggerAutogen from 'swagger-autogen';
import swaggerUiExpress from "swagger-ui-express";

import passport from "passport";
import { 
  googleStrategy,
  jwtStrategy
} from "./auth.config.js";
import { prisma } from "./db.config.js";

// 엔드포인트 import
import { 
  handleUserSignup,
  handleUserReviews
} from './controllers/user.controller.js';
import { handleListStoreReviews } from './controllers/store.controller.js';
import { StatusCodes } from 'http-status-codes';

dotenv.config();

// OAuth2 로그인과 JWT 검증 전략을 초기화합니다.
passport.use(googleStrategy);
passport.use(jwtStrategy);

const app = express()
const port = process.env.PORT;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.set('json replacer', (key, value) =>
  typeof value === 'bigint' ? parseInt(value) : value
);

// 서버 응답 통일화
app.use((req, res, next) => {
  res.success = (data, statusCode = StatusCodes.OK) => {
    return res.status(statusCode).json({
      success: true,
      code: statusCode,
      message: "요청이 성공적입니다.",
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
      message: reason,
      data,
    });
  };

  next();
});

const isLogin = passport.authenticate('jwt', { session: false });

app.get('/', (req, res) => {
  res.send('Hello World!')
})


// 로그인/회원가입 엔드포인트
app.post("/users/signup", handleUserSignup);

app.get("/oauth2/login/google",
  passport.authenticate("google", {
    session: false
  })
)
app.get("/oauth2/callback/google", 
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login-failed"
  }),
  (req, res) => {
    const tokens = req.user;

    res.status(200).json({
      success: true,
      code: StatusCodes.OK,
      message: "Google 로그인 성공",
      data: tokens
    })
  }
)

// 소셜로그인 확인 실습
app.get('/mypage', isLogin, (req,res) => {
  res.status(200).success({
    message: `인증 성공! ${req.user.name}님의 마이페이지입니다.`,
    user: req.user
  })
})


// 6주차 실습 - 페이지네이션
app.get("/api/v1/stores/:storeId/reviews", isLogin, handleListStoreReviews);

// 6주차 미션(1)
app.get("/mypage/reviews", isLogin, handleUserReviews);



// swagger docs 접속 엔드포인트
app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json"
    }
  })
)


// swagger 관련 설정
app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null";
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 9th",
      description: "UMC 9th Node.js 테스트 프로젝트입니다."
    },
    host: "localhost:3000"
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
})


// 오류 발생 시 사용
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

// port 번호로 서버 오픈
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
