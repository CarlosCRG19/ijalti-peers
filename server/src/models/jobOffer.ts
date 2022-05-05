import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from "typeorm";
import Company from "./company";


@Entity()
class JobOffer{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    salary: `${number}`;

    @Column({ nullable: false })
    address: string;

    @Column({ nullable: false })
    description: string;

    @ManyToOne(() => Company, (company) => company.jobOffers)
    company : Company;
}

export default JobOffer;    
