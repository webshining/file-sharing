import { Request, Response } from "express";
import fs from "fs";
import { DIR } from "../data/config";
import { FileDeleteDto } from "../dto/files.dto";
import { File } from "../models/file.entity";
import { Link } from "../models/link.entity";
import ModelService from "../services/model.service";

class FileController {
	private readonly fileService = new ModelService<File>(File);
	private readonly linkService = new ModelService<Link>(Link);

	get = async (req: Request<{ href: string; id: number }>, res: Response) => {
		const file = await this.fileService.getOne({ id: req.params.id });
		if (!file || (await file.link).href !== req.params.href) return res.json({ error: "File not found" });
		return res.download(DIR + "/files/" + file.id, file.name);
	};

	create = async (req: Request<{ id: number }>, res: Response) => {
		const user = (req as any).user;
		const { id } = req.params;
		const link = await this.linkService.getOne({ id, user });
		if (!link) return res.json({ error: "Link not found" });
		if (req.files)
			for (const f of Object.keys(req.files)) {
				const fu: any = (req.files as any)[f];
				const file = await this.fileService.create({ name: fu.name as string, link: { id: link.id } });
				fu.mv(DIR + "/files/" + file.id);
			}
		return res.json({ message: "Success" });
	};

	delete = async (req: Request<{ id: number }, {}, FileDeleteDto>, res: Response) => {
		const user = (req as any).user;
		const { id } = req.params;
		const { files } = req.body;
		const link = await this.linkService.getOne({ id, user });
		if (!link) return res.json({ error: "Link not found" });
		for (const file of files) {
			await this.fileService.delete({ id: file });
			fs.unlink(`${DIR}/files/${file}`, () => {});
		}
		return res.json({ message: "Success" });
	};
}

export default new FileController();
