import {
  Entity,
  Column,
  PrimaryColumn,
} from 'typeorm';

// The entity class for the MySQL events table
// should hopefully match it
@Entity()
export class Events {
  @Column("json")
  payload!: object;

  @Column("char", { length: 36 })
  alert_id!: string;

  @Column("char", { length: 255 })
  task_instance_id!: string;

  @Column("char", { length: 36 })
  visit_id!: string;

  @Column({ length: 36 })
  caregiver_id!: string;

  @Column("text")
  payload_as_text!: string;

  @Column("char", { length: 255 })
  rejected_event_id!: string;

  @Column("char", { length: 255 })
  observation_event_id!: string;

  @Column("varchar", { length: 50 })
  timestamp!: string;

  @PrimaryColumn()
  id!: string;

  @Column("varchar", { length: 50 })
  event_type!: string;

  @Column("char", { length: 36 })
  care_recipient_id!: string;
}