import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn  } from "typeorm"; 

@Entity()
class User extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true})
    firebaseId: string;

    @CreateDateColumn()
    createdAt: Date;
}

export default User;