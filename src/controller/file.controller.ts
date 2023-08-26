import { File } from "../models/file.entity";
import ModelService from "../services/model.service";

class FileController {
	private readonly fileService = new ModelService<File>(File);

}

export default new FileController();
