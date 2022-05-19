import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity} from "typeorm";

@Entity()
class Skill extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @Column({nullable :false , unique : true})
    skill : string;

}

export default Skill;
