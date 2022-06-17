import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Aspirant } from "./";

@Entity()
class WorkExperience extends BaseEntity {  
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Aspirant, aspirant => aspirant.workExperiences,{nullable: true})
    aspirant: Aspirant;

    @Column()
    title: string;

    @Column()
    at: string; 

    @Column({type: "date", nullable: true})
    startDate: string;
    
    @Column({type: "date", nullable: true})
    endDate: string;
} 

export default WorkExperience;