import { Club } from "./club";
import { Person } from "./person";
import { SanctionClub } from "./sanctionClub";
import { SanctionPerson } from "./sanctionPerson";
import { Session } from "./session";
import { SessionResult } from "./sessionResult";

export class Sanction {
    address1?: string;
    address2?: string;
    apikey?: string;
    bannerImageUrl?: string;
    city?: string;
    disciplineTypeId?: string;
    endDate?: Date;
    feature?: any;
    featuredEventId?: string;
    hidden = false;
    logoUrl?: string;
    meetStatus?: string;
    name?: string;
    program?: number;
    sanctionId?: string;
    siteLink?: string;
    siteName?: string;
    startDate?: Date;
    state?: string;
    status?: string;
    time1?: string;
    time2?: string;
    time3?: string;
    time4?: string;
    type?: string;
    vendorApiKey?: string; //this could be a security/tampering risk risk
    website?: string;
    zip?: string;
    sessions: Session[] = []
    sessionResultSets: SessionResult[] = [];
    people = new Map<number, Person>();
    sanctionPeople = new Map<number, SanctionPerson>()
    clubs = new Map<number, Club>();
    sanctionClubs = new Map<number, SanctionClub>();
}