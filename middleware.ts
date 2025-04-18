import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import BaseApi from './app/shared/api/base/BaseApi';
import { AuthResponseInterface } from './app/shared/types/interfaces/auth-response.interface';
import { DataInterface } from './app/shared/types/interfaces/data.interfaces';

const redirectToLoginPage = (req: NextRequest): NextResponse => {
  return NextResponse.redirect(new URL('/login', req.url));
};

const handleJwtTokenExpiration = async (
  req: NextRequest,
): Promise<NextResponse> => {
  try {
    const tokensResponse: DataInterface<AuthResponseInterface> =
      (await BaseApi.get(
        'auth/refresh',
      )) as DataInterface<AuthResponseInterface>;

    const isRefreshTokenExpired = tokensResponse?.status === 401;

    if (
      isRefreshTokenExpired ||
      !tokensResponse.data?.accessToken ||
      !tokensResponse.data?.refreshToken
    ) {
      return redirectToLoginPage(req);
    }

    const response = NextResponse.next();
    response.cookies.set('accessToken', tokensResponse.data.accessToken);
    response.cookies.set('refreshToken', tokensResponse.data.refreshToken);
    return response;
  } catch (error) {
    return redirectToLoginPage(req);
  }
};

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const accessToken: string | undefined = (await cookies()).get(
    'accessToken',
  )?.value;
  const refreshToken: string | undefined = (await cookies()).get(
    'refreshToken',
  )?.value;

  const areTokensPresent = Boolean(accessToken && refreshToken);
  if (!areTokensPresent) {
    return redirectToLoginPage(req);
  }

  const decoded = jwt.decode(accessToken!) as jwt.JwtPayload | null;

  if (!decoded || !decoded.exp) {
    return redirectToLoginPage(req);
  }

  const isAccessTokenExpired = dayjs.unix(decoded.exp).isBefore(dayjs());
  if (isAccessTokenExpired) {
    return await handleJwtTokenExpiration(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|register|login).*)'],
};
