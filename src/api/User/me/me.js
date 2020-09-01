import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragments";

export default {
    Query: {
        me: (_,__,{ request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const userProfile = prisma.user({id: user.id });
            const posts = prisma.user({id: user.id }).posts();
            return {
                user: userProfile, posts
            }
        }
        
        /**
         * $fragment를 대채하는 다른 방법 fragments.js 대신 아래와 같이 수정
         * 
         * me.graphql
         * type ProfileResponse {
         *      user: User!
         *      posts: [Post!]!
         * }
         * 
         * type Query {
         *      me: ProfileResponse!
         * }
         * 
         * me.js
         * me: async (_,__,...) => {
         *      const userProfile = await prisma.user({ id: user.id });
         *      const posts = await prisma.user({ id: user.id }).posts();
         *      return {
         *          user: userProfile,
         *          posts
         *      }
         * }
         */
        
        
    }
}