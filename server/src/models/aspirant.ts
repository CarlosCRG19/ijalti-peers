import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    OneToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
    OneToMany
} from "typeorm";
import Skill from "./skill";

import User from "./user";
import WorkExperience from "./workExperience";

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

    @OneToMany(() => WorkExperience, (workExperiences) => workExperiences.aspirant)
    workExperiences: WorkExperience[];

    @OneToOne(() => User)
    @JoinColumn()
    user: User
}

export default Aspirant;
