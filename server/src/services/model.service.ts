import { DeepPartial, EntityTarget, FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";
import dataSource from "../db";

class ModelService<Entity extends ObjectLiteral> {
	private readonly modelRepository: Repository<Entity>;
	private readonly target;
	constructor(target: EntityTarget<Entity>) {
		this.target = target;
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

	getOrCreate = async (
		options: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
		dto: DeepPartial<Entity>
	): Promise<Entity> => {
		let user = await this.getOne(options);
		if (!user) return this.create(dto);
		return user;
	};
}

export default ModelService;
