import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {Aspirant, Company} from "./";

@Entity()
class WorkExperience extends BaseEntity {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Aspirant, aspirant => aspirant.workExperiences)
    aspirant: Aspirant;

    @ManyToOne(() => Company, company => company.workExperiences, {nullable: true})
    company: Company;

    @Column({default: false})
    is: boolean;

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