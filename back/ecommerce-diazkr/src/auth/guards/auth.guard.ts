import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Rol } from '../roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
constructor(private readonly jwtService:JwtService){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    if(!request.headers.authorization){
      throw new BadRequestException('No se ha enviado el token')
    }
    const token = request.headers.authorization.split(' ')[1];

    if(!token){
      throw new UnauthorizedException('No trae el token')
    }

    try {
      const secret = process.env.JWT_SECRET
      const payload = this.jwtService.verify(token,{secret})
      payload.iat = new Date( payload.iat * 1000)
      payload.exp = new Date( payload.exp * 1000)
      request.user = payload;
      return true;
      
    } catch (error) {
      throw new UnauthorizedException('Token invalido')
    }

  }
}
