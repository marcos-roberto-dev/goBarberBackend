import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  provider!: string;

  @Column('time with time zone')
  date!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}

export default Appointment;
