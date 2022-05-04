import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Company {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    vision: string;

    @Column({ nullable: false })
    mision: string;

    @Column({ nullable: false })
    address: string;

    @Column({ nullable: false })
    phone1: `$${number}`;

    @Column()
    phone2: `${number}`;
}

export default Company;
