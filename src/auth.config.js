import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./db.config.js";
import jwt from "jsonwebtoken";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

dotenv.config();
const secret = process.env.JWT_SECRET;

export const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        secret,
        { expiresIn: "1h" }
    );
};

export const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user.id },
        secret,
        { expiresIn: "14d" }
    );
};

const googleVerify = async (profile) => {
    const email = profile.emails?.[0]?.value;
    if (!email) throw new Error(`profile email is required: ${profile} `);

    const placeholder = "추후 수정";
    const existing = await prisma.user.findFirst({
        where: { email }
    });

    if (existing) {
        return {
            id: Number(existing.id),
            email: existing.email,
            name: existing.name
        };
    }

    const created = await prisma.user.create({
        data: {
            email,
            name: profile.displayName,
            gender: null,
            birth: new Date(1970, 0, 1),
            address: placeholder,
            subaddr: placeholder,
            is_owner: false,
            created_at: new Date(),
            updated_at: new Date(),
            point: 0
        }
    })

    return {
        id: Number(created.id),
        email: created.email,
        name: created.name
    }
}

export const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
        clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
        callbackURL: "/oauth2/callback/google",
        scope: ["email", "profile"]
    },

    async (accessToken, refreshToken, profile, cb) => {
        try {
            const user = await googleVerify(profile);

            const jwtAccessToken = generateAccessToken(user);
            const jwtRefreshToken = generateRefreshToken(user);

            return cb(null, {
                access_token: jwtAccessToken,
                refresh_token: jwtRefreshToken
            });
        } catch (err) {
            return cb(err);
        }
    }
)

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

export const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = await prisma.user.findFirst({ where: { id: payload.id }});
    
        if(user) return done(null, user);
        else return done(null, false);
    } catch (err) {
        return done(err, false);
    }
});