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
