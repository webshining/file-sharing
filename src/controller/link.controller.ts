import { Request, Response } from "express";
import { LinkCreateDto, LinkDeleteDto, LinkUpdateDto } from "../dto/link.dto";
import { Link } from "../models/link.entity";
import ModelService from "../services/model.service";

class LinkController {
	private readonly linkService = new ModelService<Link>(Link);

	create = async (req: Request<{}, {}, LinkCreateDto>, res: Response) => {
		const { href } = req.body;
		const candidate = await this.linkService.getOne({ href });
		if (candidate) return res.json({ error: "Link already exists" });
		const link = await this.linkService.create({ href });
		return res.json({ link });
	};

	update = async (req: Request<{}, {}, LinkUpdateDto>, res: Response) => {
		const { id, href } = req.body;
		const candidate = await this.linkService.getOne({ href });
		if (candidate) return res.json({ error: "Link already exists" });
		let link = await this.linkService.getOne({ id });
		if (!link) return res.json({ error: "Link not found" });
		link = await this.linkService.update({ ...link, href });
		return res.json({ link });
	};

	delete = async (req: Request<{}, {}, LinkDeleteDto>, res: Response) => {
		const { id } = req.body;
		await this.linkService.delete({ id });
		return res.json({ message: "Success" });
	};
}

export default new LinkController();
