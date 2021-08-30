import { requestValidator } from '../../validator';

export const getAllLeadershipRolesValidator = requestValidator(
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

export const createViceroyValidator = requestValidator(
	{
		body: {
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

export const updateLeadershipRoleValidator = requestValidator(
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
				name: {
					type: 'string',
				},
				heldBy: {
					type: 'string',
				},
				attribute: {
					type: 'string',
				},
				abilityBonus: {
					type: 'number',
				},
				leadership: {
					type: 'boolean',
				},
				benefit: {
					type: 'string',
				},
				vacant: {
					type: 'boolean',
				},
				skillBonus: {
					type: 'number',
				},
			},
		},
	},
	true
);
