import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from "typeorm";
import Company from "./company";


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
}

export default JobOffer;    
