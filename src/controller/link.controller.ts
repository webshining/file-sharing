import { Request, Response } from "express";
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

	create = async (req: Request<{}, {}, LinkCreateDto>, res: Response) => {
		const user = (req as any).user;
		const { href } = req.body;
		let link = await this.linkService.getOne({ href });
		if (link) return res.json({ error: "Link already exists" });
		link = await this.linkService.create({ href, user });
		return res.json({ link });
	};

	update = async (req: Request<{ id: number }, {}, LinkUpdateDto>, res: Response) => {
		const user = (req as any).user;
		const { id } = req.params;
		const { href } = req.body;
		let link = await this.linkService.getOne({ href });
		if (link && (await link.user).id !== user.id) return res.json({ error: "Link already exists" });
		link = await this.linkService.getOne({ id });
		if (!link) return res.json({ error: "Link not found" });
		link = await this.linkService.update({ ...link, href });
		return res.json({ link });
	};

	delete = async (req: Request<{ id: number }>, res: Response) => {
		const user = (req as any).user;
		const { id } = req.params;
		const link = await this.linkService.getOne({ id, user });
		if (!link) return res.json({ error: "Link not found" });
		await this.linkService.delete({ id, user });
		return res.json({ message: "Success" });
	};
}

export default new LinkController();
