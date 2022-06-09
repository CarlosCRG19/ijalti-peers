import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn  } from "typeorm"; 

@Entity()
class BaseUser extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true})
    firebaseId: string;

    @Column({default: ''})
    username: string;

    @Column({default: ''})
    email: string;
     
    @CreateDateColumn()
    createdAt: Date;
}

export default BaseUser;
