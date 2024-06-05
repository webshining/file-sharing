import { Request, Response } from "express";
import fs from "fs";
import { DIR } from "../data/config";
import { LinkCreateDto, LinkUpdateDto } from "../dto/link.dto";
import { File } from "../models/file.entity";
import { Link } from "../models/link.entity";
import ModelService from "../services/model.service";

class LinkController {
	private readonly linkService = new ModelService<Link>(Link);
	private readonly fileService = new ModelService<File>(File);

	getMy = async (req: Request, res: Response) => {
		const user = (req as any).user;
		const links = (await this.linkService.getMany({ user })).sort((a, b) => a.id - b.id);
		return res.json({ links });
	};

	getFile = async (req: Request<{ href: string; id: number }>, res: Response) => {
		const file = await this.fileService.getOne({ id: req.params.id });
		if (!file || (await file.link).href !== req.params.href) return res.status(404).json({ detail: "File not found" });
		return res.download(DIR + "/files/" + file.id, file.name);
	};

	getOne = async (req: Request<{ href: string }>, res: Response) => {
		const link = await this.linkService.getOne({ href: req.params.href });
		if (!link) return res.status(404).json({ detail: "Link not found" });
		return res.json({ link });
	};

	create = async (req: Request<{}, {}, LinkCreateDto>, res: Response) => {
		const user = (req as any).user;
		const { href } = req.body;
		let link = await this.linkService.getOne({ href });
		if (link) return res.json({ detail: "Link already exists" });
		link = await this.linkService.create({ href, user });
		return res.json({ message: "Success" });
	};

	update = async (req: Request<{ id: number }, {}, LinkUpdateDto>, res: Response) => {
		const user = req as any;
		const { id } = req.params;
		const { href, files } = req.body;
		const candidate = await this.linkService.getOne({ href });
		if (candidate && candidate.user.id !== user.id) return res.json({ detail: "Link already exists" });
		let link = await this.linkService.getOne({ id });
		if (!link) return res.status(404).json({ detail: "Link not found" });
		if (req.files)
			for (const f of Object.keys(req.files)) {
				const fu: any = (req.files as any)[f];
				const file = await this.fileService.create({ name: fu.name as string, link: { id: link.id } });
				fu.mv(DIR + "/files/" + file.id);
			}
		if (files && files.every((i) => typeof i == "number"))
			for (const file of files) {
				await this.fileService.delete({ id: file });
				fs.unlink(`${DIR}/files/${file}`, () => {});
			}
		await this.linkService.update({ ...link, href });
		return res.json({ message: "Success" });
	};

	delete = async (req: Request<{ id: number }>, res: Response) => {
		const user = (req as any).user;
		const { id } = req.params;
		const link = await this.linkService.getOne({ id, user });
		if (!link) return res.status(404).json({ detail: "Link not found" });
		link.files.forEach((f) => fs.unlink(`${DIR}/files/${f.id}`, () => {}));
		await this.linkService.delete({ id, user });
		return res.json({ message: "Success" });
	};
}

export default new LinkController();
