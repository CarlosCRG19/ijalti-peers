import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Aspirant from "./aspirant";

@Entity()
class WorkExperience extends BaseEntity {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Aspirant, aspirant => aspirant.workExperiences)
    aspirant: Aspirant;

    @Column()
    title: string;

    @Column()
    company: string; 

    @Column({type: "date", nullable: true})
    startDate: string;
    
    @Column({type: "date", nullable: true})
    endDate: string;

} 

export default WorkExperience;