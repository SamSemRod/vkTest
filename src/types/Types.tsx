export interface GetGroupsResponseInterface {
    result: 1 | 0,
    data?: GroupInterface[]
}

export interface GroupInterface {
    "id": number,
    "name": string,
    "closed": boolean,
    "avatar_color"?: string,
    "members_count": number,
    "friends"?: UserInterface[]
}

export interface UserInterface {
    "first_name": string,
    "last_name": string
}
export enum GroupVisibility {
    Open = "OPEN",
    Closed = "CLOSED",
    All = "ALL"
}
export enum FriendsIn {
    In = "IN",
    NotIn = "NOT",
    All = "ALL"
}

export interface FilterInterface {
    "visibility": string,
    "colors": string[],
    "friendsIn": string
}
export interface ColorOption {
    value: string;
    label: string;
}
export type SetFilterFunction = (value: FilterInterface | ((prev: FilterInterface) => FilterInterface)) => void;