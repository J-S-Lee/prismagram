import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        fullName: parent => {
            return `${parent.firstName} ${parent.lastName}`;
        },
        isFollowing: async (parent, _, { request }) => {
            const { user } = request;
            const { id:parentId } = parent;
            try {
                return prisma.$exists.user({AND:[{
                    id: user.id
                }, {
                    following_some: parentId
                }]});
            } catch (error) {
                return false;
            }
        },
        isSelf: (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            return parentId === user.id;
        }
    },
    Post: {
        isLiked: (parent, _, { request }) => {
            const { user } = request;
            const { id } = parent;
            return prisma.$exists.like({
                AND: [{
                    id: user.id
                }, {
                    post: {
                        id
                    }
                }]
            })
        }
    }
    
}