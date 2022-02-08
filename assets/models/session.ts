export class Session {
    sessionId: string;
    sanctionId?: number;
    name?: string;
    date?: Date;
    time1?: string;
    time2?: string;
    time3?: string;
    time4?: string;
    squadA?: string;
    squadB?: string;
    squadC?: string;
    squadD?: string;
    squadE?: string;
    squadF?: string;
    squadG?: string;
    squadH?: string;
    squadI?: string;
    program?: string;
    constructor(opt: { sessionId: string }) {
        this.sessionId = opt.sessionId;
    }
}