import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken');


  // Check if the user is authenticated (access_token exists)
  if (!accessToken) {
    // Redirect to login if user is unauthenticated
    return NextResponse.redirect(new URL(`/login`, request.url));
  }

  // Allow access if the access_token exists
  return NextResponse.rewrite(new URL(request.url));
}

export const config = {
  matcher: [
  
    '/my-account/:path*',
  ],
};
