export enum UserRole {
    StandardUser = 'standard_user',
    ProblemUser = 'problem_user',
}

export enum UserGroup {
    StandardUsers = 'standardUsers',
    ProblemUsers = 'problemUsers',
}

export interface User {
    email: string;
    password: string;
    role: UserRole;
}

type UserObject = Record<UserGroup, User[]>;

class PlaywrightUsers {
    public users: UserObject = {
        standardUsers: [],
        problemUsers: [],
    };

    constructor() {
        this.loadUserdata();
    }

    loadUserdata() {
        const playwrightUsers = process.env.PLAYWRIGHT_USERS;
        if (!playwrightUsers) {
            throw new Error('PLAYWRIGHT_USERS is not defined.');
        }
        this.users = JSON.parse(playwrightUsers) as UserObject;
    }

    getUsers(usersType: UserGroup): User[] {
        return this.users[usersType];
    }
}

export const playwrightUsers = new PlaywrightUsers();
