import {Category} from "../../categories/entities/category.entity";
import {Level} from "./level";
import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {IsBoolean, IsEnum, IsNotEmpty} from "class-validator";

@Entity()
export class Video {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    title: string;

    @Column()
    @IsNotEmpty()
    author: string;

    @Column()
    @IsNotEmpty()
    description: string;

    @Column()
    @IsNotEmpty()
    youtubeVid: string;

    @Column()
    @IsNotEmpty()
    starsCount: number;

    @ManyToOne(type => Category, category => category.videos)
    category: Category;

    @Column()
    @IsEnum(Level)
    level: Level;

    @Column({ default: false })
    @IsBoolean()
    isActive: boolean;

    @CreateDateColumn()
    datePosted: Date;

    @UpdateDateColumn()
    lastUpdated: Date;
}
