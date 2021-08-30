import { requestValidator } from '../../validator';

export const updateLotValidator = requestValidator(
	{
		params: {
			type: 'object',
			additionalProperties: false,
			properties: {
				id: {
					type: 'number',
				},
			},
			required: ['id'],
		},
		body: {
			type: 'object',
			additionalProperties: false,
			properties: {
				lotType: {
					type: 'string',
				},
			},
		},
	},
	true
);
