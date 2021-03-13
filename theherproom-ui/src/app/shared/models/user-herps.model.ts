import {User} from "./user.model";
import {Herp} from "./herp.model";
import {Length} from "./herp-length.model";
import {Weight} from "./herp-weight.model";
import {HerpFeeders} from "./herp-feeders.model";

export interface UserHerps {
    id: string;
    nickName?: string;
    createdDate?: Date;
    user: User;
    herp: Herp;
    feeders?: HerpFeeders[];
    length?: Length[];
    weight?: Weight[];
    breeder?: boolean;
    sex?: String;
    dob?: Date;
    dateAcquired?: Date;
    
}
