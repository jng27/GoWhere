export interface Query {
    historyId?: number;
    datetime: bigint;
    location: string;
    createdAt?: Date;
}

export interface DBQuery {
    historyId: number;
    datetime: string;
    location: string;
    createdAt?: string;
    count?: number;
}
