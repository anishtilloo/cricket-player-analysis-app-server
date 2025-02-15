import type { RolesWithPermissions } from "../types/auth.types"

export const ROLES = {
    ADMIN: {
        user_in_org: {
            view: true,
            create: true,
            update: true,
            delete: false,
        },
        team: {
            view: true,
            create: true,
            update: true,
            delete: true,
        },
        player: {
            view: true,
            create: false,
            update: false,
            delete: false,
        },
        playing_squad: {
            view: true,
            create: true,
            update: true,
            delete: true,
        },
    },
    ANALYST: {
        user_in_org: {
            view: true,
            create: false,
            update: true,
            delete: false,
        },
        team: {
            view: true,
            create: true,
            update: true,
            delete: false,
        },
        player: {
            view: true,
            create: false,
            update: false,
            delete: false,
        },
        playing_squad: {
            view: true,
            create: false,
            update: false,
            delete: false,
        }
    },
    TEAM_MANAGER: {
        user_in_org: {
            view: true,
            create: false,
            update: false,
            delete: false,
        },
        team: {
            view: true,
            create: true,
            update: true,
            delete: false,
        },
        player: {
            view: true,
            create: false,
            update: false,
            delete: false,
        },
        playing_squad: {
            view: true,
            create: true,
            update: true,
            delete: true,
        },
        // comments: {
        //     view: (user, comment) => !user.blockedBy.includes(comment.authorId),
        //     create: true,
        //     update: (user, comment) => comment.authorId === user.id,
        // },
        // todos: {
        //     view: (user, todo) => !user.blockedBy.includes(todo.userId),
        //     create: true,
        //     update: (user, todo) =>
        //         todo.userId === user.id || todo.invitedUsers.includes(user.id),
        //     delete: (user, todo) =>
        //         (todo.userId === user.id || todo.invitedUsers.includes(user.id)) &&
        //         todo.completed,
        // },
    },
    PLAYER: {

    },
    RECRUITER: {

    },
    USER: {

    }, 
} as const satisfies RolesWithPermissions;