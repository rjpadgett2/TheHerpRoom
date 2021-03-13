import {UserHerps} from "./user-herps.model";

export class User {
    id: string;
    username: string;
    password: string;
    email: string;
    herps: UserHerps[];
}
