import {IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsObject, IsString} from "class-validator";
import {Category} from "../../categories/entities/category.entity";
import {Level} from "../entities/level";

export class CreateVideoDto {
   @IsString()
    title: string;

    @IsString()
    author: string;

    @IsString()
    description: string;

    @IsString()
    youtubeVid: string;

    @IsNumber()
    starsCount: number;

    @IsEnum(Level)
    level: Level;

    @IsBoolean()
    isActive: boolean;

    @IsObject()
    category: Category;
}
