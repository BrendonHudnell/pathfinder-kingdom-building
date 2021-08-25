import { requestValidator } from '../../validator';

export const getAllDistrictsValidator = requestValidator(
	{
		query: {
			type: 'object',
			additionalProperties: false,
			properties: {
				kingdomId: {
					type: 'number',
				},
			},
			required: ['kingdomId'],
		},
	},
	true
);

export const addDistrictValidator = requestValidator(
	{
		body: {
			type: 'object',
			additionalProperties: false,
			properties: {
				kingdomId: {
					type: 'number',
				},
				settlementId: {
					type: 'number',
				},
			},
			required: ['kingdomId', 'settlementId'],
		},
	},
	true
);
