import {NextRequest, NextResponse} from "next/server";
import { withAuth } from "next-auth/middleware";
//import createIntlMiddleware from "next-intl/middleware";

const locales = ["en", "pt"];
const publicPages = [
  "/",
  "/sign-in",
  "/m",
  "/m/[0-9a-z-]*/?.*",
  // (/secret requires auth)
];
/*
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "en",
});

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  (req) => intlMiddleware(req),
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/sign-in",
    },
  }
);

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(`^(/(${locales.join("|")}))?(${publicPages.join("|")})?/?$`, "i");
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}
*/

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
  },
  {
    callbacks: {
      //authorized: ({ token }) => token?.role === "admin",
      authorized: ({ token, req }) => {
        const publicPathnameRegex = RegExp(`^(/(${locales.join("|")}))?(${publicPages.join("|")})?/?$`, "i");
        const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
        return token != null || isPublicPage;
      },
    },
    pages: {
      signIn: "/sign-in",
    },
  },
);



export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],

};
