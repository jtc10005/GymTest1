export class Meet {

    sanctionId: number;
    name: string;
    logoUrl: string;
    startDate: Date;
    endDate?: Date;
    city: string;
    state: string;
    siteName?: string;
    website?: string;
    program: number
    hasMeetInfo: boolean
    constructor(options: {
        sanctionId: number;
        name: string;
        logoUrl?: string;
        startDate?: Date;
        endDate?: Date;
        city?: string;
        state?: string;
        siteName?: string;
        website?: string;
        program?: number
        hasMeetInfo?: boolean
    }) {
        this.sanctionId = options.sanctionId;
        this.name = options.name;
        this.logoUrl = options.logoUrl ?? '';
        this.startDate = options.startDate ?? new Date();
        this.endDate = options.endDate ?? undefined;
        this.city = options.city ?? '';
        this.state = options.state ?? '';
        this.siteName = options.siteName ?? undefined;
        this.website = options.website ?? '';
        this.program = options.program ?? 0;
        this.hasMeetInfo = options.hasMeetInfo ?? false;;
    }

    getFromToDate(): string {
        return `From: ${new Date(this.startDate).toLocaleDateString()} ${this.endDate ? 'To: ' + new Date(this.endDate).toLocaleDateString() : ''}`;
    }
    getFromDate(): string {
        return `${new Date(this.startDate).toLocaleDateString()}`;
    }
    getToDate(): string {
        return `${this.endDate ? new Date(this.endDate).toLocaleDateString() : ''}`;
    }
    getCityState(): string {
        return `${this.city}, ${this.state}`;
    }
}
