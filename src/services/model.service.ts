import { DeepPartial, EntityTarget, FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";
import dataSource from "../db";

class ModelService<Entity extends ObjectLiteral> {
	private readonly modelRepository: Repository<Entity>;
	constructor(target: EntityTarget<Entity>) {
		this.modelRepository = dataSource.getRepository(target);
	}

	getOne = async (options: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]): Promise<Entity | null> => {
		return this.modelRepository.findOne({ where: options });
	};

	getMany = async (options?: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]): Promise<Entity[]> => {
		return this.modelRepository.find({ where: options });
	};

	create = async (dto: DeepPartial<Entity>): Promise<Entity> => {
		const models = this.modelRepository.create(dto);
		return this.modelRepository.save(models);
	};

	update = async (dto: DeepPartial<Entity>): Promise<Entity> => {
		return this.modelRepository.save(dto);
	};

	delete = async (options: FindOptionsWhere<Entity>) => {
		return this.modelRepository.delete(options);
	};

	getOrUpdate = async (
		options: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
		dto: DeepPartial<Entity>
	): Promise<Entity> => {
		const data = await this.getOne(options);
		if (!data) return this.create(dto);
		else return this.update({...dto, id: data.id})
	};
}

export default ModelService;
