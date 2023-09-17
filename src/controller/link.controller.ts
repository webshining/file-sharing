import { Request, Response } from "express";
import fs from "fs";
import { DIR } from "../data/config";
import { LinkCreateDto, LinkUpdateDto } from "../dto/link.dto";
import { Link } from "../models/link.entity";
import ModelService from "../services/model.service";

class LinkController {
	private readonly linkService = new ModelService<Link>(Link);

	get = async (req: Request, res: Response) => {
		const user = (req as any).user;
		const links = await this.linkService.getMany({ user });
		return res.json({ links });
	};

	getOne = async (req: Request<{ href: string }>, res: Response) => {
		const link = await this.linkService.getOne({ href: req.params.href });
		if (!link) return res.json({ error: "Link not found" });
		return res.json({ link });
	};

	create = async (req: Request<{}, {}, LinkCreateDto>, res: Response) => {
		const user = (req as any).user;
		const { href } = req.body;
		let link = await this.linkService.getOne({ href });
		if (link) return res.json({ error: "Link already exists" });
		link = await this.linkService.create({ href, user });
		return res.json({ message: "Success" });
	};

	update = async (req: Request<{ id: number }, {}, LinkUpdateDto>, res: Response) => {
		const user = req as any;
		const { id } = req.params;
		const { href } = req.body;
		const candidate = await this.linkService.getOne({ href });
		if (candidate && candidate.user.id !== user.id) return res.json({ error: "Link already exists" });
		let link = await this.linkService.getOne({ id });
		if (!link) return res.json({ error: "Link not found" });
		await this.linkService.update({ ...link, href });
		return res.json({ message: "Success" });
	};

	delete = async (req: Request<{ id: number }>, res: Response) => {
		const user = (req as any).user;
		const { id } = req.params;
		const link = await this.linkService.getOne({ id, user });
		if (!link) return res.json({ error: "Link not found" });
		link.files.forEach((f) => fs.unlink(`${DIR}/files/${f.id}`, () => {}));
		await this.linkService.delete({ id, user });
		return res.json({ message: "Success" });
	};
}

export default new LinkController();
