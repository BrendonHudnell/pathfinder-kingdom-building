import { requestValidator } from '../../validator';

export const getKingdomValidator = requestValidator(
	{
		query: {
			type: 'object',
			additionalProperties: false,
			properties: {
				id: {
					type: 'number',
				},
			},
			required: ['id'],
		},
	},
	true
);
