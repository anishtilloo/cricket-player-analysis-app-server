import type { Player, PlayingSquad, RoleEnumType, Team, User } from "@prisma/client"

export type PermissionCheck<Key extends keyof Permissions> =
    | boolean
    | ((user: User, data: Permissions[Key]["dataType"]) => boolean)

export type RolesWithPermissions = {
    [R in RoleEnumType]: Partial<{
        [Key in keyof Permissions]: Partial<{
            [Action in Permissions[Key]["action"]]: PermissionCheck<Key>
        }>
    }>
}

export type Permissions = {
    user_in_org: {
        dataType: User,
        action: "view" | "create" | "update" | "delete",
    },
    team: {
        dataType: Team,
        action: "view" | "create" | "update" | "delete",
    },
    player: {
        // Can do something like Pick<Todo, "userId"> to get just the rows you use
        dataType: Player,
        action: "view" | "create" | "update" | "delete",
    },
    playing_squad: {
        dataType: PlayingSquad,
        action: "view" | "create" | "update" | "delete",
    },
    assign_role: {
        dataType: string,
        action: "update",
    },
}
