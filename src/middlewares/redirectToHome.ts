import {NextRequest, NextResponse} from "next/server";

export const redirectToHomeMiddleWare = (request: NextRequest) => {
	if (request.nextUrl.pathname === "/") {
		return NextResponse.redirect(new URL("/posts", request.url));
	}
	return NextResponse.next();
};
