import { requestValidator } from '../../validator';

export const getAllSettlementsValidator = requestValidator(
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

export const createSettlementValidator = requestValidator(
	{
		body: {
			type: 'object',
			additionalProperties: false,
			properties: {
				kingdomId: {
					type: 'number',
				},
				hexId: {
					type: 'number',
				},
			},
			required: ['kingdomId', 'hexId'],
		},
	},
	true
);
