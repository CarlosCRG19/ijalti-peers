import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from "typeorm";
import JobOffer from "./jobOffer";


@Entity()
class Company extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id : string;

    @Column({unique : true})
    name : string;

    @Column()
    vision : string;

    @Column({ nullable: false })
    mision : string;

    @Column({ nullable: false })
    address : string;

    @Column({ nullable: false, type:"numeric"})
    phone1 : `${number}`;

    @Column({type:"numeric"})
    phone2 : `${number}`;

    @OneToMany(()=>JobOffer, (jobOffer) => jobOffer.company)
    jobOffers : JobOffer[];
}

export default Company;
