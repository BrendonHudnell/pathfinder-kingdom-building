import { requestValidator } from '../../validator';

export const getAllHexesValidator = requestValidator(
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

export const updateHexValidator = requestValidator(
	{
		body: {
			type: 'object',
			additionalProperties: false,
			properties: {
				id: {
					type: 'number',
				},
				name: {
					type: 'string',
				},
				terrain: {
					type: 'string',
				},
				specialTerrain: {
					type: 'array',
					items: {
						type: 'string',
					},
				},
				explorationState: {
					type: 'string',
				},
				terrainImprovements: {
					type: 'array',
					items: {
						type: 'string',
					},
				},
				pointsOfInterest: {
					type: 'string',
				},
				notes: {
					type: 'string',
				},
			},
			required: ['id'],
		},
	},
	true
);
