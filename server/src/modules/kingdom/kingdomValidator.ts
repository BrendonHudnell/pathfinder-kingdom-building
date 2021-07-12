import { requestValidator } from '../../validator';

export const kingdomValidator = requestValidator(
	{
		query: {
			type: 'object',
			additionalProperties: false,
			properties: {
				id: {
					type: 'number',
				},
			},
		},
	},
	true
);
