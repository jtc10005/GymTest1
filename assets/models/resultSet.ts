import { Score } from "./score";

export class ResultSet {
    scores: Score[] = [];
    constructor(opt?: { scores: Score[] }) {
        this.scores = opt?.scores.map(s => new Score(s)) ?? [];
    }
}