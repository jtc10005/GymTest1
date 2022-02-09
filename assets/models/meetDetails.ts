import { Club } from "./club";
import { Meet } from "./meet";
import { Sanction } from "./sanction";
import { Person } from './person';
import { SanctionClub } from "./sanctionClub";
import { SanctionPerson } from "./sanctionPerson";
import { SessionResult } from "./sessionResult";
import { Session } from "./session";
export class MeetDetails {
    sanction: Sanction;
    clubs = new Map<number, Club>();
    people = new Map<number, Person>();
    sanctionClubs = new Map<number, SanctionClub>();
    sanctionPeople = new Map<number, SanctionPerson>();
    sessionResultSets: SessionResult[] = [];
    sessions: Session[] = [];
    constructor(opt?: {
        sanction: Sanction;
        clubs: Map<number, Club>;
        people: Map<number, Person>;
        sanctionClubs: Map<number, SanctionClub>;
        sanctionPeople: Map<number, SanctionPerson>;
        sessionResultSets: SessionResult[];
        sessions: Session[];
    }) {

        this.sanction = opt?.sanction ?? new Sanction();
        this.clubs = opt?.clubs ?? new Map<number, Club>();
        this.people = opt?.people ?? new Map<number, Person>();
        this.sanctionClubs = opt?.sanctionClubs ?? new Map<number, SanctionClub>();
        this.sanctionPeople = opt?.sanctionPeople ?? new Map<number, SanctionPerson>();
        this.sessionResultSets = opt?.sessionResultSets ?? []
        this.sessions = opt?.sessions ?? [];
        this.validate();
    }

    getClub(key: number): Club | undefined {
        return this.clubs.has(key) ? this.clubs.get(key) : undefined;
    }
    getPerson(key: number): Person | undefined {
        return this.people.has(key) ? this.people.get(key) : undefined;
    }
    getSanctionClub(key: number): SanctionClub | undefined {
        return this.sanctionClubs.has(key) ? this.sanctionClubs.get(key) : undefined;
    }

    // getSessions(): { key: string, sessionList: Session[] }[] {
    //     let sessionViewModel: { key: string, sessionList: Session[] }[] = [];
    //     this.sessions.forEach(s => {
    //         const alreadyHasSession = sessionViewModel?.find(x => x.key === s.date.toString());
    //         if (alreadyHasSession) {
    //             alreadyHasSession.sessionList.push(s);
    //             return;
    //         }
    //         sessionViewModel.push({ key: s.date.toString(), sessionList: [s] })
    //     })
    //     return sessionViewModel;
    // }
    private validate() {
        let hasValidTime1 = false;
        let hasValidTime2 = false;
        let hasValidTime3 = false;
        let hasValidTime4 = false;
        this.sessions.forEach(s => {
            if (!hasValidTime1 && s.time1 && s.time1 != "00:00:00") {
                hasValidTime1 = true;
            }
            if (!hasValidTime2 && s.time2 && s.time2 != "00:00:00") {
                hasValidTime1 = true;
            }
            if (!hasValidTime3 && s.time3 && s.time3 != "00:00:00") {
                hasValidTime3 = true;
            }
            if (!hasValidTime4 && s.time4 && s.time4 != "00:00:00") {
                hasValidTime4 = true;
            }
        })
        if (!hasValidTime1) {
            this.sanction.time1 = undefined;
        }
        if (!hasValidTime2) {
            this.sanction.time2 = undefined;
        }
        if (!hasValidTime3) {
            this.sanction.time3 = undefined;
        }
        if (!hasValidTime4) {
            this.sanction.time4 = undefined;
        }
    }
}

