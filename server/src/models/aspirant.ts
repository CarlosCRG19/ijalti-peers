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
    Employed = "EMPLOYED",
    Unemployed = "UNEMPLOYED",
    Hiring = "HIRING", 
    Searching = "SEARCHING"
}

enum EducationLevelChoices {
    HighSchool = "HIGH_SCHOOL",
    University = "UNIVERSITY",
    Masters = "MASTERS",
    Doctorate = "DOCTORATE",

}

@Entity()
class Aspirant extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    names: string; 
    
    @Column()
    firstLastName: string; 
    
    @Column()
    secondLastName: string; 

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

    @Column()
    educationLevel: EducationLevelChoices;

    @Column({length: 150})
    biography: string;

    @ManyToMany(() => Skill)
    @JoinTable() 
    skills: Skill[];

    @OneToOne(() => User)
    @JoinColumn()
    user: User
}

export default Aspirant;
