import {NextRequest, NextResponse} from "next/server";
import {redirectToHomeMiddleWare} from "./middlewares/redirectToHome";

export const middleware = (request: NextRequest) => {
	return redirectToHomeMiddleWare(request);
};
