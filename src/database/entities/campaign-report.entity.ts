import { Entity, PrimaryGeneratedColumn, Column, Unique, Index } from 'typeorm';

@Entity('campaign_reports')
@Unique(['event_time', 'client_id', 'event_name'])
export class CampaignReport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  campaign: string;

  @Column({ type: 'uuid', nullable: false })
  campaign_id: string;

  @Column({ type: 'varchar', nullable: false })
  adgroup: string;

  @Column({ type: 'uuid', nullable: false })
  adgroup_id: string;

  @Column({ type: 'varchar', nullable: false })
  ad: string;

  @Column({ type: 'uuid', nullable: false })
  ad_id: string;

  @Column({ type: 'uuid', nullable: false })
  client_id: string;

  @Column({ type: 'varchar', nullable: false })
  event_name: string;

  @Index()
  @Column({ type: 'timestamp', nullable: false })
  event_time: Date;
}
