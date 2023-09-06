export default (required: { key: string; reg?: RegExp }[]) => {
	return async (req: any, res: any, next: any) => {
		let error: string | null = null;
		required.forEach((r) => {
			if (!req.body[r.key]) {
				error = `${r.key} is required`;
			}
			const reg = r.reg || /./;
			if (!reg.test(req.body[r.key])) {
				error = "Not valid data";
			}
		});
		if (error) return res.json({ error });
		else next();
	};
};
