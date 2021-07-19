import { Request, Response, Router } from 'express';

import { districtService } from './districtService';
import { getAllDistrictsValidator } from './districtValidator';

export function createDistrictRouter(): Router {
	const router = Router();

	router.get('/', getAllDistrictsValidator, getAllDistricts);

	return router;
}

export async function getAllDistricts(
	req: Request,
	res: Response
): Promise<void> {
	const kingdomId = Number(req.query.kingdomId);

	const districts = await districtService.getAllDistricts(kingdomId);

	if (districts.length > 0) {
		res.status(200).json({ status: 200, data: districts });
	} else {
		res.status(200).json({ status: 404 });
	}
}
