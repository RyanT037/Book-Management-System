import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// Strategy for validating JSON Web Tokens (JWT) provided in the Authorization header
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      // Extract the token from the 'Authorization: Bearer <token>' header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
    });
  }

  // This method is called after the JWT is successfully verified.
  validate(payload: { sub: number; email: string; role?: string }) {
    // Normalize the JWT payload into the request.user shape used by controllers.
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
