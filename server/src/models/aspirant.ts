import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    OneToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
    ManyToOne,
    OneToMany
} from "typeorm";

import {Skill, User, WorkExperience, JobOffer} from "./"

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
    
    @Column({ nullable: true })
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

    @Column( { type: "text", nullable: true} )
    profilePicture: string;

    @OneToMany(() => WorkExperience, (workExperiences) => workExperiences.aspirant)
    workExperiences: WorkExperience[];

    @ManyToMany(() => Skill)
    @JoinTable() 
    skills: Skill[];
    
    @ManyToMany(type => JobOffer, jobOffer => jobOffer.interestedAspirants)
    interestedInOffers: JobOffer[];

    @OneToOne(() => User)
    @JoinColumn()
    user: User
}

export default Aspirant;
