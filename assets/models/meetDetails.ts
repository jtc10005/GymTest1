import { Meet } from "./meet";
import { Sanction } from "./sanction";

export class MeetDetails {
    sanction?: Sanction;

    constructor(opt?:{
        sanction?: Sanction
    }){
        this.sanction = opt?.sanction ?? undefined;
    }
}

