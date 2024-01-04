import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/users.entity';

@Entity({
    name:"notes"
})
export class Note {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column('uuid')
  userId: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'bigint', default: () => 'CAST(EXTRACT(EPOCH FROM NOW()) as BIGINT)' })
  createdAt: number;

  @Column({ type: 'bigint', default: () => 'CAST(EXTRACT(EPOCH FROM NOW()) as BIGINT)', onUpdate: 'CAST(EXTRACT(EPOCH FROM NOW()) as BIGINT)' })
  updatedAt: number;

  @Column({ type: 'bigint', nullable: true, default:null })
  deletedAt: number;

  @ManyToOne(() => User, user => user.notes)
  @JoinColumn({ name: 'userId' })
  user: User;
}