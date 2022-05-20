import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn  } from "typeorm"; 

enum WorkingStatusChoices {
    "Employed",
    "Unemployed",
    "Hiring", 
    "Searching"
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

    @Column()
    workingStatus: WorkingStatusChoices;
}


export default Aspirant;