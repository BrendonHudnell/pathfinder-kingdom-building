import { Request, Response, Router } from 'express';

import { verifyToken } from '../../middleware';
import { District, districtService } from './districtService';
import {
	createDistrictValidator,
	getAllDistrictsValidator,
	updateDistrictValidator,
} from './districtValidator';

export function createDistrictRouter(): Router {
	const router = Router();

	router.use(verifyToken);

	router.post('/create', createDistrictValidator, createDistrict);
	router.patch('/:id', updateDistrictValidator, updateDistrict);
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

export async function createDistrict(
	req: Request,
	res: Response
): Promise<void> {
	const kingdomId = req.body.kingdomId;
	const settlementId = req.body.settlementId;

	const district = await districtService.createDistrict(
		kingdomId,
		settlementId
	);

	if (district) {
		res.status(200).json({ status: 200, data: district });
	} else {
		res.status(200).json({ status: 404 });
	}
}

export async function updateDistrict(
	req: Request,
	res: Response
): Promise<void> {
	const id = Number(req.params.id);

	const success = await districtService.updateDistrict(
		id,
		req.body as Partial<District>
	);

	if (success) {
		res.status(200).json({
			status: 200,
		});
	} else {
		res.status(200).json({
			status: 404,
		});
	}
}
