import { Request, Response } from "express";
import { LinkCreateDto, LinkDeleteDto, LinkUpdateDto } from "../dto/link.dto";
import { Link } from "../models/link.entity";
import ModelService from "../services/model.service";

class LinkController {
	private readonly linkService = new ModelService<Link>(Link);

	create = async (req: Request<{}, {}, LinkCreateDto>, res: Response) => {
		const { name, href } = req.body;
		const candidate = await this.linkService.getOne({ href });
		if (candidate) return res.json({ error: "Link already exists" });
		const link = await this.linkService.create({ href, name });
		return res.json({ link });
	};

	update = async (req: Request<{}, {}, LinkUpdateDto>, res: Response) => {
		const { id, name, href } = req.body;
		const candidate = await this.linkService.getOne({ href });
		if (candidate) return res.json({ error: "Link already exists" });
		let link = await this.linkService.getOne({ id });
		if (!link) return res.json({ error: "Link not found" });
		link = await this.linkService.update({ ...link, name, href });
		return res.json({ link });
	};

	delete = async (req: Request<{}, {}, LinkDeleteDto>, res: Response) => {
		const { id } = req.body;
		await this.linkService.delete({ id });
		return res.json({ message: "Success" });
	};
}

export default new LinkController();
