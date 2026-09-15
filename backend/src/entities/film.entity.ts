import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity({ name: 'films' })
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float', nullable: true })
  rating: number;

  @Column({ nullable: true })
  director: string;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  about: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  cover: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film, { cascade: true })
  schedules: Schedule[];
}
