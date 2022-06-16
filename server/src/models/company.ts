import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity, OneToOne, JoinColumn } from "typeorm";
import { User, JobOffer } from "./"

@Entity()
class Company extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique : true})
    name: string;

    @Column()
    vision: string;

    @Column({ nullable: false })
    mision: string;

    @Column({ nullable: false })
    address: string;

    @Column({ nullable : false})
    businessLine: string;

    @Column({ nullable: false, type:"numeric"})
    phone1: `${number}`;

    @Column({type:"numeric"})
    phone2: `${number}`;

    @Column({unique: true})
    socialReason: string;

    @Column({type: "numeric"})
    postalCode: number;

    @Column()
    locationState: string;

    @Column()
    locationCity: string;

    @Column()
    contactEmail: string;

    @Column({type: "int"})
    numEmployees: number;

    @Column( { type: "text", nullable: true} )
    profilePicture: string;

    @OneToMany(() => JobOffer, (jobOffer) => jobOffer.company)
    jobOffers : JobOffer[];

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}

export default Company;
