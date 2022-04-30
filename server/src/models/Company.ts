import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';

import Offer from './Offer';

@Entity()
class Company extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    businessName: string;

    @Column()
    password: string;

    @OneToMany(() => Offer, (offer) => offer.company)
    offers: Offer[];
}

export default Company;
