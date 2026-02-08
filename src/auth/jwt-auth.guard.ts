import { Injectable, CanActivate, ExecutionContext, UnauthorizedError } from '@hazeljs/core';
import { JwtService } from '@hazeljs/auth';
import { PrismaService } from '@hazeljs/prisma';

interface RequestWithUser {
  headers: { authorization?: string };
  user?: { id: string; name: string; email: string };
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as RequestWithUser;
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedError('Missing or invalid Authorization header');
    }

    try {
      const payload = this.jwtService.verify(token);
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        select: { id: true, name: true, email: true },
      });

      if (!user) {
        throw new UnauthorizedError('User not found');
      }

      request.user = user;
      return true;
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw error;
      }
      throw new UnauthorizedError('Invalid or expired token');
    }
  }

  private extractTokenFromHeader(request: RequestWithUser): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
