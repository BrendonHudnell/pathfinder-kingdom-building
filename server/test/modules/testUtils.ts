import { createConnection, getConnection, getRepository } from 'typeorm';
import bcrypt from 'bcrypt';

import { env } from '../../src/env';
import { DistrictEntity } from '../../src/modules/district';
import { HexEntity } from '../../src/modules/hex';
import { KingdomEntity } from '../../src/modules/kingdom';
import { LeadershipEntity } from '../../src/modules/leadership';
import { LotEntity } from '../../src/modules/lot';
import { SettlementEntity } from '../../src/modules/settlement';
import { UserEntity } from '../../src/modules/user';

export const connection = {
	async create() {
		await createConnection({
			type: 'sqlite',
			database: ':memory:',
			dropSchema: true,
			entities: [
				DistrictEntity,
				HexEntity,
				KingdomEntity,
				LeadershipEntity,
				LotEntity,
				SettlementEntity,
				UserEntity,
			],
			synchronize: true,
			logging: false,
		});
	},

	async close() {
		await getConnection().close();
	},
};

export async function populateDatabase(): Promise<void> {
	// add kingdom
	const kingdomRepo = getRepository(KingdomEntity);

	const kingdom = new KingdomEntity();
	kingdom.name = 'Kingdom 1';
	kingdom.alignment = 'Neutral';
	kingdom.month = 1;
	kingdom.treasury = 0;
	kingdom.unrest = 0;
	kingdom.holidayEdict = 'None';
	kingdom.promotionEdict = 'None';
	kingdom.taxationEdict = 'None';
	kingdom.fame1Set = false;
	kingdom.fame1Value = 'none';
	kingdom.fame11Set = false;
	kingdom.fame11Value = 'none';
	kingdom.fame26Set = false;
	kingdom.fame26Value = 'none';
	kingdom.fame51Set = false;
	kingdom.fame51Value = 'none';
	kingdom.fame101Set = false;
	kingdom.fame101Value = 'none';
	kingdom.fame201Set = false;
	kingdom.fame201Value = 'none';
	kingdom.government = 'Feudal Monarchy';
	kingdom.settlementModifiers = false;
	kingdom.settlementGovernment = false;
	kingdom.kingdomModifiers = false;
	kingdom.kingdomGovernment = false;
	kingdom.kingdomFame = false;
	kingdom.leadershipSkills = false;

	await kingdomRepo.save(kingdom);

	// add hexes
	const hexRepo = getRepository(HexEntity);

	const hex1 = new HexEntity();
	hex1.kingdom = kingdom;
	hex1.name = 'Hex 1';
	hex1.terrain = 'Plains';
	hex1.bridgeSpecialTerrain = false;
	hex1.building = false;
	hex1.freeCity = false;
	hex1.lair = false;
	hex1.landmark = false;
	hex1.resource = false;
	hex1.river = false;
	hex1.ruin = false;
	hex1.explorationState = 'Settled';
	hex1.aqueduct = false;
	hex1.bridgeImprovement = false;
	hex1.canal = false;
	hex1.farm = false;
	hex1.fishery = false;
	hex1.fort = false;
	hex1.highway = false;
	hex1.mine = false;
	hex1.quarry = false;
	hex1.road = false;
	hex1.sawmill = false;
	hex1.vineyard = false;
	hex1.watchtower = false;

	const hex2 = new HexEntity();
	hex2.kingdom = kingdom;
	hex2.name = 'Hex 2';
	hex2.terrain = 'Plains';
	hex2.bridgeSpecialTerrain = true;
	hex2.building = true;
	hex2.freeCity = true;
	hex2.lair = true;
	hex2.landmark = true;
	hex2.resource = true;
	hex2.river = true;
	hex2.ruin = true;
	hex2.explorationState = 'Unexplored';
	hex2.aqueduct = true;
	hex2.bridgeImprovement = true;
	hex2.canal = true;
	hex2.farm = true;
	hex2.fishery = true;
	hex2.fort = true;
	hex2.highway = true;
	hex2.mine = true;
	hex2.quarry = true;
	hex2.road = true;
	hex2.sawmill = true;
	hex2.vineyard = true;
	hex2.watchtower = true;
	hex2.pointsOfInterest = 'Some string';
	hex2.notes = 'Some other string';

	await hexRepo.save(hex1);
	await hexRepo.save(hex2);

	// add settlements
	const settlementRepo = getRepository(SettlementEntity);

	const settlement1 = new SettlementEntity();
	settlement1.hex = hex1;
	settlement1.kingdom = kingdom;
	settlement1.name = 'Settlement 1';
	settlement1.academy = 0;
	settlement1.alchemist = 0;
	settlement1.arena = 0;
	settlement1.bank = 0;
	settlement1.bardicCollege = 0;
	settlement1.barracks = 0;
	settlement1.blackMarket = 0;
	settlement1.brewery = 0;
	settlement1.bridge = 0;
	settlement1.bureau = 0;
	settlement1.castersTower = 0;
	settlement1.castle = 0;
	settlement1.cathedral = 0;
	settlement1.cistern = 0;
	settlement1.cityWall = 0;
	settlement1.danceHall = 0;
	settlement1.dump = 0;
	settlement1.everflowingSpring = 0;
	settlement1.exoticArtisan = 0;
	settlement1.foreignQuarter = 0;
	settlement1.foundry = 0;
	settlement1.garrison = 0;
	settlement1.granary = 0;
	settlement1.graveyard = 0;
	settlement1.guildhall = 0;
	settlement1.herbalist = 0;
	settlement1.hospital = 0;
	settlement1.house = 0;
	settlement1.inn = 0;
	settlement1.jail = 0;
	settlement1.library = 0;
	settlement1.luxuryStore = 0;
	settlement1.magicShop = 0;
	settlement1.magicalAcademy = 0;
	settlement1.magicalStreetlamps = 0;
	settlement1.mansion = 0;
	settlement1.market = 0;
	settlement1.menagerie = 0;
	settlement1.militaryAcademy = 0;
	settlement1.mill = 0;
	settlement1.mint = 0;
	settlement1.moat = 0;
	settlement1.monastery = 0;
	settlement1.monument = 0;
	settlement1.museum = 0;
	settlement1.nobleVilla = 0;
	settlement1.observatory = 0;
	settlement1.orphanage = 0;
	settlement1.palace = 0;
	settlement1.park = 0;
	settlement1.pavedStreets = 0;
	settlement1.pier = 0;
	settlement1.sewerSystem = 0;
	settlement1.shop = 0;
	settlement1.shrine = 0;
	settlement1.smithy = 0;
	settlement1.stable = 0;
	settlement1.stockyard = 0;
	settlement1.tannery = 0;
	settlement1.tavern = 0;
	settlement1.temple = 0;
	settlement1.tenement = 0;
	settlement1.theater = 0;
	settlement1.townHall = 0;
	settlement1.tradeShop = 0;
	settlement1.university = 0;
	settlement1.watchtower = 0;
	settlement1.waterfront = 0;
	settlement1.waterway = 0;
	settlement1.wallUnrestUsed = false;
	settlement1.moatUnrestUsed = false;
	settlement1.government = 'Autocracy';

	const settlement2 = new SettlementEntity();
	settlement2.hex = hex2;
	settlement2.kingdom = kingdom;
	settlement2.name = 'Settlement 2';
	settlement2.academy = 0;
	settlement2.alchemist = 0;
	settlement2.arena = 0;
	settlement2.bank = 0;
	settlement2.bardicCollege = 0;
	settlement2.barracks = 0;
	settlement2.blackMarket = 0;
	settlement2.brewery = 0;
	settlement2.bridge = 0;
	settlement2.bureau = 0;
	settlement2.castersTower = 0;
	settlement2.castle = 0;
	settlement2.cathedral = 0;
	settlement2.cistern = 0;
	settlement2.cityWall = 0;
	settlement2.danceHall = 0;
	settlement2.dump = 0;
	settlement2.everflowingSpring = 0;
	settlement2.exoticArtisan = 0;
	settlement2.foreignQuarter = 0;
	settlement2.foundry = 0;
	settlement2.garrison = 0;
	settlement2.granary = 0;
	settlement2.graveyard = 0;
	settlement2.guildhall = 0;
	settlement2.herbalist = 0;
	settlement2.hospital = 0;
	settlement2.house = 0;
	settlement2.inn = 0;
	settlement2.jail = 0;
	settlement2.library = 0;
	settlement2.luxuryStore = 0;
	settlement2.magicShop = 0;
	settlement2.magicalAcademy = 0;
	settlement2.magicalStreetlamps = 0;
	settlement2.mansion = 0;
	settlement2.market = 0;
	settlement2.menagerie = 0;
	settlement2.militaryAcademy = 0;
	settlement2.mill = 0;
	settlement2.mint = 0;
	settlement2.moat = 0;
	settlement2.monastery = 0;
	settlement2.monument = 0;
	settlement2.museum = 0;
	settlement2.nobleVilla = 0;
	settlement2.observatory = 0;
	settlement2.orphanage = 0;
	settlement2.palace = 0;
	settlement2.park = 0;
	settlement2.pavedStreets = 0;
	settlement2.pier = 0;
	settlement2.sewerSystem = 0;
	settlement2.shop = 0;
	settlement2.shrine = 0;
	settlement2.smithy = 0;
	settlement2.stable = 0;
	settlement2.stockyard = 0;
	settlement2.tannery = 0;
	settlement2.tavern = 0;
	settlement2.temple = 0;
	settlement2.tenement = 0;
	settlement2.theater = 0;
	settlement2.townHall = 0;
	settlement2.tradeShop = 0;
	settlement2.university = 0;
	settlement2.watchtower = 0;
	settlement2.waterfront = 0;
	settlement2.waterway = 0;
	settlement2.wallUnrestUsed = false;
	settlement2.moatUnrestUsed = false;
	settlement2.government = 'Autocracy';

	await settlementRepo.save(settlement1);
	await settlementRepo.save(settlement2);

	// add districts
	const districtRepo = getRepository(DistrictEntity);

	const district1 = new DistrictEntity();
	district1.kingdom = kingdom;
	district1.settlement = settlement1;
	district1.name = 'District 1';
	district1.paved = false;
	district1.sewers = false;
	district1.terrainNorth = 'Land';
	district1.wallNorth = false;
	district1.moatNorth = false;
	district1.terrainSouth = 'Land';
	district1.wallSouth = false;
	district1.moatSouth = false;
	district1.terrainEast = 'Land';
	district1.wallEast = false;
	district1.moatEast = false;
	district1.terrainWest = 'Land';
	district1.wallWest = false;
	district1.moatWest = false;

	const district2 = new DistrictEntity();
	district2.kingdom = kingdom;
	district2.settlement = settlement1;
	district2.name = 'District 2';
	district2.paved = false;
	district2.sewers = false;
	district2.terrainNorth = 'Land';
	district2.wallNorth = false;
	district2.moatNorth = false;
	district2.terrainSouth = 'Land';
	district2.wallSouth = false;
	district2.moatSouth = false;
	district2.terrainEast = 'Land';
	district2.wallEast = false;
	district2.moatEast = false;
	district2.terrainWest = 'Land';
	district2.wallWest = false;
	district2.moatWest = false;

	await districtRepo.save(district1);
	await districtRepo.save(district2);

	// add lots
	const lotRepo = getRepository(LotEntity);

	const lot1 = new LotEntity();
	lot1.district = district1;

	const lot2 = new LotEntity();
	lot2.district = district1;
	lot2.lotType = 'Lot Type';

	await lotRepo.save(lot1);
	await lotRepo.save(lot2);

	// add leadership roles
	const leadershipRepo = getRepository(LeadershipEntity);

	const role = new LeadershipEntity();
	role.kingdom = kingdom;
	role.name = 'Ruler';
	role.heldBy = 'Ruler';
	role.attribute = 'Dexterity';
	role.abilityBonus = 0;
	role.leadership = false;
	role.benefit = 'Economy';
	role.vacant = false;
	role.skillBonus = 0;

	await leadershipRepo.save(role);

	// add test user
	const userRepo = getRepository(UserEntity);

	const user = new UserEntity();
	user.username = 'testName';
	user.password = await bcrypt.hash('password', env.saltRounds);

	await userRepo.save(user);
}
