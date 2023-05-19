import { DeepPartial, EntityTarget, FindOptionsWhere, ObjectLiteral, Repository } from "typeorm"
import dataSource from "../db"

class ModelService<Entity extends ObjectLiteral> {
    private readonly modelRepository: Repository<Entity>
    private readonly target
    constructor(target: EntityTarget<Entity>) {
        this.target = target
        this.modelRepository = dataSource.getRepository(target)
    }

    getOne = async (options: FindOptionsWhere<Entity>): Promise<Entity | null> => {
        return this.modelRepository.findOne({where: options})
    }

    getMany = async (options?: FindOptionsWhere<Entity>): Promise<Entity[]> => {
        return this.modelRepository.find({where: options})
    }

    create = async (dto: DeepPartial<Entity>): Promise<Entity> => {
        const models = this.modelRepository.create(dto)
        return this.modelRepository.save(models)
    }

    getOrCreate = async (options: FindOptionsWhere<Entity>, dto: DeepPartial<Entity>, conflict: string[]): Promise<Entity> => {
        await this.modelRepository.upsert(dto, conflict)
        return this.getOne(options) as Promise<Entity>
    }
}

export default ModelService