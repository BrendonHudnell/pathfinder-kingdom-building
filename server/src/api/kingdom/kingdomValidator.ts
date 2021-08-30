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

export const updateKingdomValidator = requestValidator(
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
				alignment: {
					type: 'string',
				},
				month: {
					type: 'number',
				},
				treasury: {
					type: 'number',
				},
				unrest: {
					type: 'number',
				},
				holidayEdict: {
					type: 'string',
				},
				promotionEdict: {
					type: 'string',
				},
				taxationEdict: {
					type: 'string',
				},
				fame: {
					type: 'object',
					additionalProperties: false,
					properties: {
						'1': {
							type: 'object',
							additionalProperties: false,
							properties: {
								set: {
									type: 'boolean',
								},
								value: {
									type: 'string',
								},
							},
						},
						'11': {
							type: 'object',
							additionalProperties: false,
							properties: {
								set: {
									type: 'boolean',
								},
								value: {
									type: 'string',
								},
							},
						},
						'26': {
							type: 'object',
							additionalProperties: false,
							properties: {
								set: {
									type: 'boolean',
								},
								value: {
									type: 'string',
								},
							},
						},
						'51': {
							type: 'object',
							additionalProperties: false,
							properties: {
								set: {
									type: 'boolean',
								},
								value: {
									type: 'string',
								},
							},
						},
						'101': {
							type: 'object',
							additionalProperties: false,
							properties: {
								set: {
									type: 'boolean',
								},
								value: {
									type: 'string',
								},
							},
						},
						'201': {
							type: 'object',
							additionalProperties: false,
							properties: {
								set: {
									type: 'boolean',
								},
								value: {
									type: 'string',
								},
							},
						},
					},
				},
				government: {
					type: 'string',
				},
				options: {
					type: 'object',
					additionalProperties: false,
					properties: {
						settlementModifiers: {
							type: 'boolean',
						},
						settlementGovernment: {
							type: 'boolean',
						},
						kingdomModifiers: {
							type: 'boolean',
						},
						kingdomGovernment: {
							type: 'boolean',
						},
						kingdomFame: {
							type: 'boolean',
						},
						leadershipSkills: {
							type: 'boolean',
						},
					},
				},
			},
		},
	},
	true
);
