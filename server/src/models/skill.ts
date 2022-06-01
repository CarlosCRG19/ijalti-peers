import { Entity, Column, PrimaryGeneratedColumn, BaseEntity} from "typeorm";

@Entity()
class Skill extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : string;

    @Column({nullable :false , unique : true})
    name: string;

}

export default Skill;
