import { requestValidator } from '../../validator';

export const registerValidator = requestValidator(
	{
		body: {
			type: 'object',
			additionalProperties: false,
			properties: {
				username: {
					type: 'string',
					minLength: 1,
				},
				password: {
					type: 'string',
					minLength: 8,
				},
			},
			required: ['username', 'password'],
		},
	},
	true
);

export const loginValidator = requestValidator(
	{
		body: {
			type: 'object',
			additionalProperties: false,
			properties: {
				username: {
					type: 'string',
					minLength: 1,
				},
				password: {
					type: 'string',
					minLength: 8,
				},
			},
			required: ['username', 'password'],
		},
	},
	true
);
