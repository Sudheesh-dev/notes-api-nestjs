import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeUpdate } from 'typeorm';
import { Note } from '../../notes/entities/notes.entity';
import { SharedNote } from 'src/modules/notes/entities/shared-notes.entity';

@Entity({
  name:"users"
})
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  passwordHash: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ default: true })
  isActive: boolean; 

  @Column({ type: 'bigint', default: () => 'CAST(EXTRACT(EPOCH FROM NOW()) as BIGINT)' })
  createdAt: number;

  @Column({ type: 'bigint', default: () => 'CAST(EXTRACT(EPOCH FROM NOW()) as BIGINT)', onUpdate: 'CAST(EXTRACT(EPOCH FROM NOW()) as BIGINT)' })
  updatedAt: number;

  @OneToMany(() => Note, note => note.user)
  notes: Note[];

  @OneToMany(() => SharedNote, (sharedNote) => sharedNote.user)
  sharedNotes: SharedNote[];

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = Math.floor(Date.now()/1000);
  }

}