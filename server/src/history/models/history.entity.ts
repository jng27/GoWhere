import { Transform } from '@nestjs/class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('history')
export class HistoryEntity {
    @PrimaryGeneratedColumn() historyId: number;

    @Column({ type: 'bigint' })
    @Transform(({ value }) => BigInt(value))
    datetime: bigint;

    @Column({ default: '' }) location: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
