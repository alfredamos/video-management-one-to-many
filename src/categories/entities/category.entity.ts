import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty} from "class-validator";
import {Video} from "../../videos/entities/video.entity";

@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    @IsNotEmpty()
    name: string;

    @OneToMany(type => Video, video => video.category)
    videos: Video[];
}
