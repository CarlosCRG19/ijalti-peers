import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity, OneToOne, JoinColumn } from "typeorm";
import JobOffer from "./jobOffer";
import User from "./user";


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

    @Column({ nullable : false})
    businessLine : string;

    @Column({ nullable: false, type:"numeric"})
    phone1 : `${number}`;

    @Column({type:"numeric"})
    phone2 : `${number}`;

    @OneToMany(() => JobOffer, (jobOffer) => jobOffer.company)
    jobOffers : JobOffer[];

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}

export default Company;
