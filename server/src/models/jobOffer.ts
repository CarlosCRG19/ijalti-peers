import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, JoinTable, ManyToMany} from "typeorm";
import Company from "./company";
import Skill from "./skill";

@Entity()
class JobOffer extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    salary: `${number}`;

    @Column({ nullable: false })
    city: string;

    @Column({ nullable: false })
    description: string;

    @ManyToOne(() => Company, (company) => company.jobOffers)
    company : Company;

    @ManyToMany(() => Skill)
    @JoinTable()
    preferredSkills: Skill[];

    @ManyToMany(() => Skill)
    @JoinTable()
    requiredSkills: Skill[];

}

export default JobOffer;    
