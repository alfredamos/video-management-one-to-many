import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {Category} from "./entities/category.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository, UpdateResult} from "typeorm";

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = await this.repo.create(createCategoryDto);
    return await this.repo.save(category);
  }

  async findAll(searchKey: string): Promise<Category[]> {
    const query = this.repo.createQueryBuilder('category');

    if (searchKey){
      query.andWhere(
      `LOWER(category.name) LIKE LOWER(:searchKey)` , {searchKey: `%${searchKey}%`},)
    }

    return await query.leftJoinAndSelect('category.videos', 'videos')
        .getMany();
  }

  async findOne(id: number): Promise<Promise<Category> | Promise<NotFoundException>> {
    const category = await this.repo.findOne(id,{ relations: ["videos"] });

    if (!category){
      return new NotFoundException(`Category with Id = ${id} not found.`)
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Promise<UpdateResult> | Promise<NotFoundException>> {
    const category = await this.repo.findOne(id);

    if (!category){
      return new NotFoundException(`Category with Id = ${id} not found.`);
    }

    return await this.repo.update(id, updateCategoryDto);
  }

  async remove(id: number): Promise<Promise<DeleteResult> | Promise<NotFoundException>> {
    const category = await this.repo.findOne(id);

    if (!category){
      return new NotFoundException(`Category with Id = ${id} not found.`);
    }

    return await this.repo.delete(id);
  }
}
