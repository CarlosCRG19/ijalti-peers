import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    OneToOne,
    JoinColumn,
    ManyToMany,
    JoinTable
} from "typeorm";
import Skill from "./skill";

import User from "./user";

enum WorkingStatusChoices {
    Emplyed = "EMPLOYED",
    Unemployed = "UNEMPLOYED",
    Hiring = "HIRING", 
    Searching = "SEARCHING"
}

@Entity()
class Aspirant extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string; 
    
    @Column()
    lastName: string; 

    @Column()
    birthDate: Date; 

    @Column()
    nationality: string;
    
    @Column()
    residenceCountry: string;
    
    @Column()
    residenceState: string;
    
    @Column()
    residenceCity: string;
    
    @Column()
    yearsOfExperience: number;

    @Column({default: "SEARCHING"})
    workingStatus: WorkingStatusChoices;

    @ManyToMany(() => Skill)
    @JoinTable() 
    skills: Skill[];

    @OneToOne(() => User)
    @JoinColumn()
    user: User
}

export default Aspirant;
