export const USER_FRAGMENT = `
    id
    username
`;
export const COMMENT_FRAGMENT = `
    id
    text
    user {
        ${USER_FRAGMENT}
    }
`;

export const FILE_FRAGMENT = `
    id
    url
`;


export const FULL_POST_FRAGMENT = `
fragment postParts on Post {
    id
    location
    caption
    user {
        ${USER_FRAGMENT}
    }
    files {
        ${FILE_FRAGMENT}
    }
    comments {
        ${COMMENT_FRAGMENT}
    }
}
`;

export const ROOM_FRAGMENT = `
fragment roomParts on Room {
    id
    participants {
        id
    }
}
`;