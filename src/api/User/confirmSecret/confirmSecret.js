import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
    Mutation: {
        confirmSecret: async (_, args, {request}) => {
            // for test
            console.log(request);
            console.log(request.user);
            const { email, secret } = args;
            const user = await prisma.user({email});
            if (user.loginSecret === secret) {
                // JWT
                return generateToken(user.id);
            } else {
                throw Error("Wrong email/secret combination.");
            }
        }
    }
}