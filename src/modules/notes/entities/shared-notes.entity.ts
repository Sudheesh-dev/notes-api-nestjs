import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Note } from "./notes.entity";
import { User } from "src/modules/users/entities/users.entity";

@Entity({
    name:"shared_notes"
})
@Unique(['noteId', 'userId'])
export class SharedNote {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column('uuid')
    noteId: string;

    @Column('uuid')
    userId: string;
  
    @ManyToOne(() => Note, (note) => note.sharedWith)
    @JoinColumn({ name: 'noteId' })
    note: Note;
  
    @ManyToOne(() => User, (user) => user.sharedNotes)
    @JoinColumn({ name: 'userId' })
    user: User;
  }