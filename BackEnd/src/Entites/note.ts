import {BaseEntity,Column,Entity ,CreateDateColumn,PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
class Note extends BaseEntity {
    //this is coloumn auto generated and primary
    @PrimaryGeneratedColumn()
    id:Number;

    @Column()
    title:string;

    @Column()
    body:string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedDate:Date;
}

export default Note;