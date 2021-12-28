import {Feeders} from "./feeders.model";

export interface HerpFeeders {
    id: number;
    weight: number;
    length: number;
    commonName: string;
    createdDate: Date;
    feeder: Feeders;
    
}
