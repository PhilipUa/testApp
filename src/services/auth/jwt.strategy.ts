import { Strategy, ExtractJwt } from 'passport-jwt';
import prisma from '../../helpers/prisma';

export const JwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string,
  },
  async function (jwtPayload, done) {
    const user = await prisma.user.findUnique({
      where: { username: jwtPayload.username },
    });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  }
);
