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

export const updateDistrictValidator = requestValidator(
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
				paved: {
					type: 'boolean',
				},
				sewers: {
					type: 'boolean',
				},
				north: {
					type: 'object',
					additionalProperties: false,
					properties: {
						terrain: {
							type: 'string',
						},
						wall: {
							type: 'boolean',
						},
						moat: {
							type: 'boolean',
						},
					},
				},
				south: {
					type: 'object',
					additionalProperties: false,
					properties: {
						terrain: {
							type: 'string',
						},
						wall: {
							type: 'boolean',
						},
						moat: {
							type: 'boolean',
						},
					},
				},
				east: {
					type: 'object',
					additionalProperties: false,
					properties: {
						terrain: {
							type: 'string',
						},
						wall: {
							type: 'boolean',
						},
						moat: {
							type: 'boolean',
						},
					},
				},
				west: {
					type: 'object',
					additionalProperties: false,
					properties: {
						terrain: {
							type: 'string',
						},
						wall: {
							type: 'boolean',
						},
						moat: {
							type: 'boolean',
						},
					},
				},
			},
		},
	},
	true
);
