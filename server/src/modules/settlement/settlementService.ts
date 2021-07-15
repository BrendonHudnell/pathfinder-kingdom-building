import { getRepository } from 'typeorm';

import { SettlementEntity } from './settlementEntity';

export interface Settlement {
	id: number;
	name: string;
	hexId: number;
	districts: number[];
	buildings: {
		Academy: number;
		Alchemist: number;
		Arena: number;
		Bank: number;
		'Bardic College': number;
		Barracks: number;
		'Black Market': number;
		Brewery: number;
		Bridge: number;
		Bureau: number;
		"Caster's Tower": number;
		Castle: number;
		Cathedral: number;
		Cistern: number;
		'City Wall': number;
		'Dance Hall': number;
		Dump: number;
		'Everflowing Spring': number;
		'Exotic Artisan': number;
		'Foreign Quarter': number;
		Foundry: number;
		Garrison: number;
		Granary: number;
		Graveyard: number;
		Guildhall: number;
		Herbalist: number;
		Hospital: number;
		House: number;
		Inn: number;
		Jail: number;
		Library: number;
		'Luxury Store': number;
		'Magic Shop': number;
		'Magical Academy': number;
		'Magical Streetlamps': number;
		Mansion: number;
		Market: number;
		Menagerie: number;
		'Military Academy': number;
		Mill: number;
		Mint: number;
		Moat: number;
		Monastery: number;
		Monument: number;
		Museum: number;
		'Noble Villa': number;
		Observatory: number;
		Orphanage: number;
		Palace: number;
		Park: number;
		'Paved Streets': number;
		Pier: number;
		'Sewer System': number;
		Shop: number;
		Shrine: number;
		Smithy: number;
		Stable: number;
		Stockyard: number;
		Tannery: number;
		Tavern: number;
		Temple: number;
		Tenement: number;
		Theater: number;
		'Town Hall': number;
		'Trade Shop': number;
		University: number;
		Watchtower: number;
		Waterfront: number;
		Waterway: number;
	};
	wallUnrestUsed: boolean;
	moatUnrestUsed: boolean;
	government: string;
}

export const settlementService = {
	getAllSettlements,
};

async function getAllSettlements(
	kingdomId: number
): Promise<Settlement[] | undefined> {
	const settlementRepository = getRepository(SettlementEntity);

	const settlements = await settlementRepository
		.createQueryBuilder('settlement')
		.where({ kingdom: kingdomId })
		.select(['settlement', 'hex.id'])
		.leftJoin('settlement.hex', 'hex')
		.getMany();

	if (settlements) {
		return settlements.map((settlement) => {
			const districts =
				settlement.districts?.map((district) => district.id) ?? [];

			return {
				id: settlement.id,
				name: settlement.name,
				hexId: settlement.hex.id,
				districts,
				buildings: {
					Academy: settlement.academy,
					Alchemist: settlement.alchemist,
					Arena: settlement.arena,
					Bank: settlement.bank,
					'Bardic College': settlement.bardicCollege,
					Barracks: settlement.barracks,
					'Black Market': settlement.blackMarket,
					Brewery: settlement.brewery,
					Bridge: settlement.bridge,
					Bureau: settlement.bureau,
					"Caster's Tower": settlement.castersTower,
					Castle: settlement.castle,
					Cathedral: settlement.cathedral,
					Cistern: settlement.cistern,
					'City Wall': settlement.cityWall,
					'Dance Hall': settlement.danceHall,
					Dump: settlement.dump,
					'Everflowing Spring': settlement.everflowingSpring,
					'Exotic Artisan': settlement.exoticArtisan,
					'Foreign Quarter': settlement.foreignQuarter,
					Foundry: settlement.foundry,
					Garrison: settlement.garrison,
					Granary: settlement.granary,
					Graveyard: settlement.graveyard,
					Guildhall: settlement.guildhall,
					Herbalist: settlement.herbalist,
					Hospital: settlement.hospital,
					House: settlement.house,
					Inn: settlement.inn,
					Jail: settlement.jail,
					Library: settlement.library,
					'Luxury Store': settlement.luxuryStore,
					'Magic Shop': settlement.magicShop,
					'Magical Academy': settlement.magicalAcademy,
					'Magical Streetlamps': settlement.magicalStreetlamps,
					Mansion: settlement.mansion,
					Market: settlement.market,
					Menagerie: settlement.menagerie,
					'Military Academy': settlement.militaryAcademy,
					Mill: settlement.mill,
					Mint: settlement.mint,
					Moat: settlement.moat,
					Monastery: settlement.monastery,
					Monument: settlement.monument,
					Museum: settlement.museum,
					'Noble Villa': settlement.nobleVilla,
					Observatory: settlement.observatory,
					Orphanage: settlement.orphanage,
					Palace: settlement.palace,
					Park: settlement.park,
					'Paved Streets': settlement.pavedStreets,
					Pier: settlement.pier,
					'Sewer System': settlement.sewerSystem,
					Shop: settlement.shop,
					Shrine: settlement.shrine,
					Smithy: settlement.smithy,
					Stable: settlement.stable,
					Stockyard: settlement.stockyard,
					Tannery: settlement.tannery,
					Tavern: settlement.tavern,
					Temple: settlement.temple,
					Tenement: settlement.tenement,
					Theater: settlement.theater,
					'Town Hall': settlement.townHall,
					'Trade Shop': settlement.tradeShop,
					University: settlement.university,
					Watchtower: settlement.watchtower,
					Waterfront: settlement.waterfront,
					Waterway: settlement.waterway,
				},
				wallUnrestUsed: settlement.wallUnrestUsed,
				moatUnrestUsed: settlement.moatUnrestUsed,
				government: settlement.government,
			};
		});
	}

	return undefined;
}
