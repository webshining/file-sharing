import { Request, Response } from "express";
import { LinkCreateDto, LinkUpdateDto } from "../dto/link.dto";
import { Link } from "../models/link.entity";
import ModelService from "../services/model.service";

class LinkController {
	private readonly linkService = new ModelService<Link>(Link);

	get = async (req: Request<{}, {}, { user: { id: number } }>, res: Response) => {
		const { user } = req.body;
		const links = await this.linkService.getMany({ user: user });
		return res.json({ links });
	};

	create = async (req: Request<{}, {}, LinkCreateDto>, res: Response) => {
		const { href, user } = req.body;
		let link = await this.linkService.getOne({ href });
		if (link) return res.json({ error: "Link already exists" });
		link = await this.linkService.create({ href, user: user });
		return res.json({ link });
	};

	update = async (req: Request<{ id: number }, {}, LinkUpdateDto>, res: Response) => {
		const { id } = req.params;
		const { href, user } = req.body;
		let link = await this.linkService.getOne({ href });
		if (link && (await link.user).id !== user.id) return res.json({ error: "Link already exists" });
		link = await this.linkService.getOne({ id, user });
		if (!link) return res.json({ error: "Link not found" });
		link = await this.linkService.update({ ...link, href });
		return res.json({ link });
	};

	delete = async (req: Request<{ id: number }>, res: Response) => {
		const { id } = req.params;
		const { user } = req.body;
		const link = await this.linkService.getOne({ id, user });
		if (!link) return res.json({ error: "Link not found" });
		await this.linkService.delete({ id, user });
		return res.json({ message: "Success" });
	};
}

export default new LinkController();
