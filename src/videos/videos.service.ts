import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Video} from "./entities/video.entity";
import {DeleteResult, Repository, UpdateResult} from "typeorm";

@Injectable()
export class VideosService {
  constructor(@InjectRepository(Video) private repo: Repository<Video>){}

  async create(createVideoDto: CreateVideoDto): Promise<Video> {
    const video = this.repo.create(createVideoDto);
    return await this.repo.save(video);
  }

  async findAll(searchKey: string): Promise<Video[]> {
    const query = this.repo.createQueryBuilder('video');

    if (searchKey){
      query.andWhere(
          `LOWER(video.title) LIKE LOWER(:searchKey) 
     OR LOWER(video.author) LIKE LOWER(:searchKey) 
     OR LOWER(video.description) LIKE LOWER(:searchKey) 
     OR LOWER(video.youtubeVid) LIKE LOWER(:searchKey)` , {searchKey: `%${searchKey}%`},);

    }

    return await query
        .leftJoinAndSelect('video.category', 'category')
        .getMany();
  }

  async findOne(id: number): Promise<Promise<Video> | Promise<NotFoundException>> {
    const video = await this.repo.findOne(id, { relations: ["category"] });

    if (!video){
      return new NotFoundException(`Video with Id = ${id} not found.`)
    }

    return video;
  }

  async update(id: number, updateVideoDto: UpdateVideoDto): Promise<Promise<UpdateResult> | Promise<NotFoundException>> {
    const video = await this.repo.findOne(id);
    if (!video){
      return new NotFoundException(`Video with Id = ${id} not found.`)
    }

    return await this.repo.update(id, updateVideoDto);
  }

  async remove(id: number): Promise<Promise<DeleteResult> | Promise<NotFoundException>> {
    const video = await this.repo.findOne(id);
    if (!video){
      return new NotFoundException(`Video with Id = ${id} not found.`)
    }
    return await this.repo.delete(id);
  }
}
