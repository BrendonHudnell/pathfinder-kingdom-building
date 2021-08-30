import { getRepository } from 'typeorm';

import { HexEntity } from '../hex';
import { KingdomEntity } from '../kingdom';
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
	createSettlement,
	updateSettlement,
};

async function getAllSettlements(kingdomId: number): Promise<Settlement[]> {
	const settlementRepository = getRepository(SettlementEntity);

	const settlements = await settlementRepository
		.createQueryBuilder('settlement')
		.where({ kingdom: kingdomId })
		.select(['settlement', 'hex.id'])
		.leftJoin('settlement.hex', 'hex')
		.getMany();

	return settlements.map((settlement) =>
		convertSettlementEntityToSettlement(settlement)
	);
}

async function createSettlement(
	kingdomId: number,
	hexId: number
): Promise<Settlement | undefined> {
	const settlementRepository = getRepository(SettlementEntity);
	const kingdomRepository = getRepository(KingdomEntity);
	const hexRepository = getRepository(HexEntity);

	const kingdom = await kingdomRepository.findOne(kingdomId);
	const hex = await hexRepository.findOne(hexId);

	if (!kingdom || !hex) {
		return;
	}

	const temp = new SettlementEntity();
	temp.hex = hex;
	temp.kingdom = kingdom;
	temp.name = 'New Settlement';
	temp.academy = 0;
	temp.alchemist = 0;
	temp.arena = 0;
	temp.bank = 0;
	temp.bardicCollege = 0;
	temp.barracks = 0;
	temp.blackMarket = 0;
	temp.brewery = 0;
	temp.bridge = 0;
	temp.bureau = 0;
	temp.castersTower = 0;
	temp.castle = 0;
	temp.cathedral = 0;
	temp.cistern = 0;
	temp.cityWall = 0;
	temp.danceHall = 0;
	temp.dump = 0;
	temp.everflowingSpring = 0;
	temp.exoticArtisan = 0;
	temp.foreignQuarter = 0;
	temp.foundry = 0;
	temp.garrison = 0;
	temp.granary = 0;
	temp.graveyard = 0;
	temp.guildhall = 0;
	temp.herbalist = 0;
	temp.hospital = 0;
	temp.house = 0;
	temp.inn = 0;
	temp.jail = 0;
	temp.library = 0;
	temp.luxuryStore = 0;
	temp.magicShop = 0;
	temp.magicalAcademy = 0;
	temp.magicalStreetlamps = 0;
	temp.mansion = 0;
	temp.market = 0;
	temp.menagerie = 0;
	temp.militaryAcademy = 0;
	temp.mill = 0;
	temp.mint = 0;
	temp.moat = 0;
	temp.monastery = 0;
	temp.monument = 0;
	temp.museum = 0;
	temp.nobleVilla = 0;
	temp.observatory = 0;
	temp.orphanage = 0;
	temp.palace = 0;
	temp.park = 0;
	temp.pavedStreets = 0;
	temp.pier = 0;
	temp.sewerSystem = 0;
	temp.shop = 0;
	temp.shrine = 0;
	temp.smithy = 0;
	temp.stable = 0;
	temp.stockyard = 0;
	temp.tannery = 0;
	temp.tavern = 0;
	temp.temple = 0;
	temp.tenement = 0;
	temp.theater = 0;
	temp.townHall = 0;
	temp.tradeShop = 0;
	temp.university = 0;
	temp.watchtower = 0;
	temp.waterfront = 0;
	temp.waterway = 0;
	temp.wallUnrestUsed = false;
	temp.moatUnrestUsed = false;
	temp.government = 'Autocracy';

	const newSettlement = await settlementRepository.save(temp);

	return convertSettlementEntityToSettlement(newSettlement);
}

function convertSettlementEntityToSettlement(
	settlementEntity: SettlementEntity
): Settlement {
	const districts =
		settlementEntity.districts?.map((district) => district.id) ?? [];

	return {
		id: settlementEntity.id,
		name: settlementEntity.name,
		hexId: settlementEntity.hex.id,
		districts,
		buildings: {
			Academy: settlementEntity.academy,
			Alchemist: settlementEntity.alchemist,
			Arena: settlementEntity.arena,
			Bank: settlementEntity.bank,
			'Bardic College': settlementEntity.bardicCollege,
			Barracks: settlementEntity.barracks,
			'Black Market': settlementEntity.blackMarket,
			Brewery: settlementEntity.brewery,
			Bridge: settlementEntity.bridge,
			Bureau: settlementEntity.bureau,
			"Caster's Tower": settlementEntity.castersTower,
			Castle: settlementEntity.castle,
			Cathedral: settlementEntity.cathedral,
			Cistern: settlementEntity.cistern,
			'City Wall': settlementEntity.cityWall,
			'Dance Hall': settlementEntity.danceHall,
			Dump: settlementEntity.dump,
			'Everflowing Spring': settlementEntity.everflowingSpring,
			'Exotic Artisan': settlementEntity.exoticArtisan,
			'Foreign Quarter': settlementEntity.foreignQuarter,
			Foundry: settlementEntity.foundry,
			Garrison: settlementEntity.garrison,
			Granary: settlementEntity.granary,
			Graveyard: settlementEntity.graveyard,
			Guildhall: settlementEntity.guildhall,
			Herbalist: settlementEntity.herbalist,
			Hospital: settlementEntity.hospital,
			House: settlementEntity.house,
			Inn: settlementEntity.inn,
			Jail: settlementEntity.jail,
			Library: settlementEntity.library,
			'Luxury Store': settlementEntity.luxuryStore,
			'Magic Shop': settlementEntity.magicShop,
			'Magical Academy': settlementEntity.magicalAcademy,
			'Magical Streetlamps': settlementEntity.magicalStreetlamps,
			Mansion: settlementEntity.mansion,
			Market: settlementEntity.market,
			Menagerie: settlementEntity.menagerie,
			'Military Academy': settlementEntity.militaryAcademy,
			Mill: settlementEntity.mill,
			Mint: settlementEntity.mint,
			Moat: settlementEntity.moat,
			Monastery: settlementEntity.monastery,
			Monument: settlementEntity.monument,
			Museum: settlementEntity.museum,
			'Noble Villa': settlementEntity.nobleVilla,
			Observatory: settlementEntity.observatory,
			Orphanage: settlementEntity.orphanage,
			Palace: settlementEntity.palace,
			Park: settlementEntity.park,
			'Paved Streets': settlementEntity.pavedStreets,
			Pier: settlementEntity.pier,
			'Sewer System': settlementEntity.sewerSystem,
			Shop: settlementEntity.shop,
			Shrine: settlementEntity.shrine,
			Smithy: settlementEntity.smithy,
			Stable: settlementEntity.stable,
			Stockyard: settlementEntity.stockyard,
			Tannery: settlementEntity.tannery,
			Tavern: settlementEntity.tavern,
			Temple: settlementEntity.temple,
			Tenement: settlementEntity.tenement,
			Theater: settlementEntity.theater,
			'Town Hall': settlementEntity.townHall,
			'Trade Shop': settlementEntity.tradeShop,
			University: settlementEntity.university,
			Watchtower: settlementEntity.watchtower,
			Waterfront: settlementEntity.waterfront,
			Waterway: settlementEntity.waterway,
		},
		wallUnrestUsed: settlementEntity.wallUnrestUsed,
		moatUnrestUsed: settlementEntity.moatUnrestUsed,
		government: settlementEntity.government,
	};
}

async function updateSettlement(
	id: number,
	updates: Partial<Settlement>
): Promise<boolean> {
	const settlementRepository = getRepository(SettlementEntity);

	const settlement = await settlementRepository.findOne(id);

	if (!settlement) {
		return false;
	}

	settlement.name = updates.name ?? settlement.name;
	settlement.academy = updates.buildings?.Academy ?? settlement.academy;
	settlement.alchemist = updates.buildings?.Alchemist ?? settlement.alchemist;
	settlement.arena = updates.buildings?.Arena ?? settlement.arena;
	settlement.bank = updates.buildings?.Bank ?? settlement.bank;
	settlement.bardicCollege =
		updates.buildings?.['Bardic College'] ?? settlement.bardicCollege;
	settlement.barracks = updates.buildings?.Barracks ?? settlement.barracks;
	settlement.blackMarket =
		updates.buildings?.['Black Market'] ?? settlement.blackMarket;
	settlement.brewery = updates.buildings?.Brewery ?? settlement.brewery;
	settlement.bridge = updates.buildings?.Bridge ?? settlement.bridge;
	settlement.bureau = updates.buildings?.Bureau ?? settlement.bureau;
	settlement.castersTower =
		updates.buildings?.["Caster's Tower"] ?? settlement.castersTower;
	settlement.castle = updates.buildings?.Castle ?? settlement.castle;
	settlement.cathedral = updates.buildings?.Cathedral ?? settlement.cathedral;
	settlement.cistern = updates.buildings?.Cistern ?? settlement.cistern;
	settlement.cityWall = updates.buildings?.['City Wall'] ?? settlement.cityWall;
	settlement.danceHall =
		updates.buildings?.['Dance Hall'] ?? settlement.danceHall;
	settlement.dump = updates.buildings?.Dump ?? settlement.dump;
	settlement.everflowingSpring =
		updates.buildings?.['Everflowing Spring'] ?? settlement.everflowingSpring;
	settlement.exoticArtisan =
		updates.buildings?.['Exotic Artisan'] ?? settlement.exoticArtisan;
	settlement.foreignQuarter =
		updates.buildings?.['Foreign Quarter'] ?? settlement.foreignQuarter;
	settlement.foundry = updates.buildings?.Foundry ?? settlement.foundry;
	settlement.garrison = updates.buildings?.Garrison ?? settlement.garrison;
	settlement.granary = updates.buildings?.Granary ?? settlement.granary;
	settlement.graveyard = updates.buildings?.Graveyard ?? settlement.graveyard;
	settlement.guildhall = updates.buildings?.Guildhall ?? settlement.guildhall;
	settlement.herbalist = updates.buildings?.Herbalist ?? settlement.herbalist;
	settlement.hospital = updates.buildings?.Hospital ?? settlement.hospital;
	settlement.house = updates.buildings?.House ?? settlement.house;
	settlement.inn = updates.buildings?.Inn ?? settlement.inn;
	settlement.jail = updates.buildings?.Jail ?? settlement.jail;
	settlement.library = updates.buildings?.Library ?? settlement.library;
	settlement.luxuryStore =
		updates.buildings?.['Luxury Store'] ?? settlement.luxuryStore;
	settlement.magicShop =
		updates.buildings?.['Magic Shop'] ?? settlement.magicShop;
	settlement.magicalAcademy =
		updates.buildings?.['Magical Academy'] ?? settlement.magicalAcademy;
	settlement.magicalStreetlamps =
		updates.buildings?.['Magical Streetlamps'] ?? settlement.magicalStreetlamps;
	settlement.mansion = updates.buildings?.Mansion ?? settlement.mansion;
	settlement.market = updates.buildings?.Market ?? settlement.market;
	settlement.menagerie = updates.buildings?.Menagerie ?? settlement.menagerie;
	settlement.militaryAcademy =
		updates.buildings?.['Military Academy'] ?? settlement.militaryAcademy;
	settlement.mill = updates.buildings?.Mill ?? settlement.mill;
	settlement.mint = updates.buildings?.Mint ?? settlement.mint;
	settlement.moat = updates.buildings?.Moat ?? settlement.moat;
	settlement.monastery = updates.buildings?.Monastery ?? settlement.monastery;
	settlement.monument = updates.buildings?.Monument ?? settlement.monument;
	settlement.museum = updates.buildings?.Museum ?? settlement.museum;
	settlement.nobleVilla =
		updates.buildings?.['Noble Villa'] ?? settlement.nobleVilla;
	settlement.observatory =
		updates.buildings?.Observatory ?? settlement.observatory;
	settlement.orphanage = updates.buildings?.Orphanage ?? settlement.orphanage;
	settlement.palace = updates.buildings?.Palace ?? settlement.palace;
	settlement.park = updates.buildings?.Park ?? settlement.park;
	settlement.pavedStreets =
		updates.buildings?.['Paved Streets'] ?? settlement.pavedStreets;
	settlement.pier = updates.buildings?.Pier ?? settlement.pier;
	settlement.sewerSystem =
		updates.buildings?.['Sewer System'] ?? settlement.sewerSystem;
	settlement.shop = updates.buildings?.Shop ?? settlement.shop;
	settlement.shrine = updates.buildings?.Shrine ?? settlement.shrine;
	settlement.smithy = updates.buildings?.Smithy ?? settlement.smithy;
	settlement.stable = updates.buildings?.Stable ?? settlement.stable;
	settlement.stockyard = updates.buildings?.Stockyard ?? settlement.stockyard;
	settlement.tannery = updates.buildings?.Tannery ?? settlement.tannery;
	settlement.tavern = updates.buildings?.Tavern ?? settlement.tavern;
	settlement.temple = updates.buildings?.Temple ?? settlement.temple;
	settlement.tenement = updates.buildings?.Temple ?? settlement.tenement;
	settlement.theater = updates.buildings?.Theater ?? settlement.theater;
	settlement.townHall = updates.buildings?.['Town Hall'] ?? settlement.townHall;
	settlement.tradeShop =
		updates.buildings?.['Trade Shop'] ?? settlement.tradeShop;
	settlement.university =
		updates.buildings?.University ?? settlement.university;
	settlement.watchtower =
		updates.buildings?.Watchtower ?? settlement.watchtower;
	settlement.waterfront =
		updates.buildings?.Waterfront ?? settlement.waterfront;
	settlement.waterway = updates.buildings?.Waterway ?? settlement.waterway;
	settlement.wallUnrestUsed =
		updates.wallUnrestUsed ?? settlement.wallUnrestUsed;
	settlement.moatUnrestUsed =
		updates.moatUnrestUsed ?? settlement.moatUnrestUsed;
	settlement.government = updates.government ?? settlement.government;

	await settlementRepository.save(settlement);

	return true;
}
