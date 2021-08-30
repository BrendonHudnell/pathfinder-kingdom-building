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

export const updateSettlementValidator = requestValidator(
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
				buildings: {
					type: 'object',
					additionalProperties: false,
					properties: {
						Academy: {
							type: 'number',
						},
						Alchemist: {
							type: 'number',
						},
						Arena: {
							type: 'number',
						},
						Bank: {
							type: 'number',
						},
						'Bardic College': {
							type: 'number',
						},
						Barracks: {
							type: 'number',
						},
						'Black Market': {
							type: 'number',
						},
						Brewery: {
							type: 'number',
						},
						Bridge: {
							type: 'number',
						},
						Bureau: {
							type: 'number',
						},
						"Caster's Tower": {
							type: 'number',
						},
						Castle: {
							type: 'number',
						},
						Cathedral: {
							type: 'number',
						},
						Cistern: {
							type: 'number',
						},
						'City Wall': {
							type: 'number',
						},
						'Dance Hall': {
							type: 'number',
						},
						Dump: {
							type: 'number',
						},
						'Everflowing Spring': {
							type: 'number',
						},
						'Exotic Artisan': {
							type: 'number',
						},
						'Foreign Quarter': {
							type: 'number',
						},
						Foundry: {
							type: 'number',
						},
						Garrison: {
							type: 'number',
						},
						Granary: {
							type: 'number',
						},
						Graveyard: {
							type: 'number',
						},
						Guildhall: {
							type: 'number',
						},
						Herbalist: {
							type: 'number',
						},
						Hospital: {
							type: 'number',
						},
						House: {
							type: 'number',
						},
						Inn: {
							type: 'number',
						},
						Jail: {
							type: 'number',
						},
						Library: {
							type: 'number',
						},
						'Luxury Store': {
							type: 'number',
						},
						'Magic Shop': {
							type: 'number',
						},
						'Magical Academy': {
							type: 'number',
						},
						'Magical Streetlamps': {
							type: 'number',
						},
						Mansion: {
							type: 'number',
						},
						Market: {
							type: 'number',
						},
						Menagerie: {
							type: 'number',
						},
						'Military Academy': {
							type: 'number',
						},
						Mill: {
							type: 'number',
						},
						Mint: {
							type: 'number',
						},
						Moat: {
							type: 'number',
						},
						Monastery: {
							type: 'number',
						},
						Monument: {
							type: 'number',
						},
						Museum: {
							type: 'number',
						},
						'Noble Villa': {
							type: 'number',
						},
						Observatory: {
							type: 'number',
						},
						Orphanage: {
							type: 'number',
						},
						Palace: {
							type: 'number',
						},
						Park: {
							type: 'number',
						},
						'Paved Streets': {
							type: 'number',
						},
						Pier: {
							type: 'number',
						},
						'Sewer System': {
							type: 'number',
						},
						Shop: {
							type: 'number',
						},
						Shrine: {
							type: 'number',
						},
						Smithy: {
							type: 'number',
						},
						Stable: {
							type: 'number',
						},
						Stockyard: {
							type: 'number',
						},
						Tannery: {
							type: 'number',
						},
						Tavern: {
							type: 'number',
						},
						Temple: {
							type: 'number',
						},
						Tenement: {
							type: 'number',
						},
						Theater: {
							type: 'number',
						},
						'Town Hall': {
							type: 'number',
						},
						'Trade Shop': {
							type: 'number',
						},
						University: {
							type: 'number',
						},
						Watchtower: {
							type: 'number',
						},
						Waterfront: {
							type: 'number',
						},
						Waterway: {
							type: 'number',
						},
					},
				},
				wallUnrestUsed: {
					type: 'boolean',
				},
				moatUnrestUsed: {
					type: 'boolean',
				},
				government: {
					type: 'string',
				},
			},
		},
	},
	true
);
