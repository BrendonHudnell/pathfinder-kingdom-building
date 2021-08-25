import { Request, Response, Router } from 'express';

import { withAuth } from '../../middleware';
import { districtService } from './districtService';
import {
	addDistrictValidator,
	getAllDistrictsValidator,
} from './districtValidator';

export function createDistrictRouter(): Router {
	const router = Router();

	router.get('/', getAllDistrictsValidator, getAllDistricts);
	router.post('/add', withAuth, addDistrictValidator, addDistrict);

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

export async function addDistrict(req: Request, res: Response): Promise<void> {
	const kingdomId = req.body.kingdomId;
	const settlementId = req.body.settlementId;

	const district = await districtService.addDistrict(kingdomId, settlementId);

	if (district) {
		res.status(200).json({ status: 200, data: district });
	} else {
		res.status(200).json({ status: 404 });
	}
}
