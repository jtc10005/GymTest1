import { Club } from "./club";
import { Meet } from "./meet";
import { Sanction } from "./sanction";
import { Person } from './person';
import { SanctionClub } from "./sanctionClub";
import { SanctionPerson } from "./sanctionPerson";
import { SessionResult } from "./sessionResult";
import { Session } from "./session";
export class MeetDetails {
    sanction?: Sanction;
    clubs = new Map<number, Club>();
    people = new Map<number, Person>();
    sanctionClubs = new Map<number, SanctionClub>();
    sanctionPeople = new Map<number, SanctionPerson>();
    sessionResultSets: SessionResult[] = [];
    sessions: Session[] = [];
    constructor(opt?: {
        sanction?: Sanction;
        clubs: Map<number, Club>;
        people: Map<number, Person>;
        sanctionClubs: Map<number, SanctionClub>;
        sanctionPeople: Map<number, SanctionPerson>;
        sessionResultSets: SessionResult[];
        sessions: Session[];
    }) {

        this.sanction = opt?.sanction ?? undefined;
        this.clubs = opt?.clubs ?? new Map<number, Club>();
        this.people = opt?.people ?? new Map<number, Person>();
        this.sanctionClubs = opt?.sanctionClubs ?? new Map<number, SanctionClub>();
        this.sanctionPeople = opt?.sanctionPeople ?? new Map<number, SanctionPerson>();
        this.sessionResultSets = opt?.sessionResultSets ?? []
        this.sessions = opt?.sessions ?? [];
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
}

