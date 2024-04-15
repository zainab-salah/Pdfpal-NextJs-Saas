// import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
// import { NextApiRequest } from "next";

// export async function GET(request: NextApiRequest, { params }:any) {
//   const endpoint = params.kindeAuth;
//   return handleAuth(request, endpoint);
// }

import {handleAuth} from "@kinde-oss/kinde-auth-nextjs/server";
export const GET = handleAuth();