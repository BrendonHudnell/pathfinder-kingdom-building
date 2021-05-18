export type BuildingId = number;

export type BuildingType =
	| null
	| 'Academy H'
	| 'Academy V'
	| 'Alchemist'
	| 'Arena'
	| 'Bank'
	| 'Bardic College H'
	| 'Bardic College V'
	| 'Barracks'
	| 'Black Market'
	| 'Brewery'
	| 'Bridge'
	| 'Bureau H'
	| 'Bureau V'
	| "Caster's Tower"
	| 'Castle'
	| 'Cathedral'
	| 'Cistern'
	| 'City Wall'
	| 'Dance Hall'
	| 'Dump'
	// 'Everflowing Spring' |
	| 'Exotic Artisan'
	| 'Foreign Quarter'
	| 'Foundry H'
	| 'Foundry V'
	| 'Garrison H'
	| 'Garrison V'
	| 'Granary'
	| 'Graveyard'
	| 'Guildhall H'
	| 'Guildhall V'
	| 'Herbalist'
	| 'Hospital H'
	| 'Hospital V'
	| 'House'
	| 'Inn'
	| 'Jail'
	| 'Library'
	| 'Luxury Store'
	| 'Magic Shop'
	| 'Magical Academy H'
	| 'Magical Academy V'
	// 'Magical Streetlamps' |
	| 'Mansion'
	| 'Market H'
	| 'Market V'
	| 'Menagerie'
	| 'Military Academy H'
	| 'Military Academy V'
	| 'Mill'
	| 'Mint'
	| 'Moat'
	| 'Monastery H'
	| 'Monastery V'
	| 'Monument'
	| 'Museum H'
	| 'Museum V'
	| 'Noble Villa H'
	| 'Noble Villa V'
	| 'Observatory'
	| 'Orphanage'
	| 'Palace'
	| 'Park'
	| 'Paved Streets'
	| 'Pier'
	| 'Sewer System'
	| 'Shop'
	| 'Shrine'
	| 'Smithy'
	| 'Stable'
	| 'Stockyard'
	| 'Tannery'
	| 'Tavern'
	| 'Temple H'
	| 'Temple V'
	| 'Tenement'
	| 'Theater H'
	| 'Theater V'
	| 'Town Hall H'
	| 'Town Hall V'
	| 'Trade Shop'
	| 'University'
	| 'Watchtower'
	| 'Watergate'
	| 'Waterfront'
	| 'Waterway';

export interface Building {
	id: BuildingId;
	name: BuildingType;
	description: string;
	size: 1 | 2 | 4;
	cost: number;
	economy?: number;
	stability?: number;
	loyalty?: number;
	unrest?: number;
	discount?: BuildingType[];
	defense?: number;
	limit?: string;
	upgradeTo?: BuildingType[];
	baseValueIncrease?: number;
	special?: string;
}

export const buildingList: Building[] = [
	{
		id: 0,
		name: 'Academy H',
		description: 'An institution of higher learning.',
		cost: 52,
		size: 2,
		economy: 2,
		loyalty: 2,
		discount: ["Caster's Tower", 'Library', 'Magic Shop'],
		upgradeTo: ['University'],
	},
	{
		id: 1,
		name: 'Academy V',
		description: 'An institution of higher learning.',
		cost: 52,
		size: 2,
		economy: 2,
		loyalty: 2,
		discount: ["Caster's Tower", 'Library', 'Magic Shop'],
		upgradeTo: ['University'],
	},
	{
		id: 2,
		name: 'Alchemist',
		description:
			'The laboratory and home of a crafter of poisons, potions, or alchemical items.',
		cost: 18,
		size: 1,
		economy: 1,
		limit: 'Adjacent to 1 House',
		baseValueIncrease: 1000,
	},
	{
		id: 3,
		name: 'Arena',
		description: 'A large public structure for competitions and team sports.',
		cost: 40,
		size: 4,
		stability: 4,
		limit: '1 per settlement',
	},
	{
		id: 4,
		name: 'Bank',
		description: 'A secure building for storing valuables and granting loans.',
		cost: 28,
		size: 1,
		economy: 4,
		baseValueIncrease: 2000,
	},
	{
		id: 5,
		name: 'Bardic College H',
		description:
			'A center for artistic learning. Education in a Bardic College also includes research into a wide-range of historical topics.',
		cost: 40,
		size: 2,
		economy: 1,
		stability: 1,
		loyalty: 3,
		discount: ['Library', 'Museum H', 'Museum V', 'Theater H', 'Theater V'],
	},
	{
		id: 6,
		name: 'Bardic College V',
		description:
			'A center for artistic learning. Education in a Bardic College also includes research into a wide-range of historical topics.',
		cost: 40,
		size: 2,
		economy: 1,
		stability: 1,
		loyalty: 3,
		discount: ['Library', 'Museum H', 'Museum V', 'Theater H', 'Theater V'],
	},
	{
		id: 7,
		name: 'Barracks',
		description:
			'A building to house conscripts, guards, militia, soldiers, or similar military forces.',
		cost: 6,
		size: 1,
		unrest: -1,
		upgradeTo: ['Garrison H', 'Garrison V'],
		defense: 2,
	},
	{
		id: 8,
		name: 'Black Market',
		description: 'A number of shops with secret and usually illegal wares.',
		cost: 50,
		size: 1,
		economy: 2,
		stability: 1,
		unrest: 1,
		limit: 'Adjacent to 2 houses',
		baseValueIncrease: 2000,
	},
	{
		id: 9,
		name: 'Brewery',
		description:
			'A building for beer brewing, winemaking, or some similar use.',
		cost: 6,
		size: 1,
		stability: 1,
		loyalty: 1,
	},
	{
		id: 10, //NA
		name: 'Bridge',
		description: 'Allows travel across a Waterway, easing transportation.',
		cost: 6,
		size: 1,
		economy: 1,
		special: 'Shares the space with a Waterway building',
	},
	{
		id: 11,
		name: 'Bureau H',
		description:
			'A large warren of offices for clerks and record-keepers working for a guild or government.',
		cost: 10,
		size: 2,
		economy: 1,
		stability: 1,
		loyalty: -1,
	},
	{
		id: 12,
		name: 'Bureau V',
		description:
			'A large warren of offices for clerks and record-keepers working for a guild or government.',
		cost: 10,
		size: 2,
		economy: 1,
		stability: 1,
		loyalty: -1,
	},
	{
		id: 13,
		name: "Caster's Tower",
		description: 'The home and laboratory for a spellcaster.',
		cost: 30,
		size: 1,
		economy: 1,
		loyalty: 1,
	},
	{
		id: 14,
		name: 'Castle',
		description:
			'The home of the settlement’s leader or the heart of its defenses.',
		cost: 54,
		size: 4,
		economy: 2,
		stability: 2,
		loyalty: 2,
		unrest: -4,
		discount: ['Noble Villa H', 'Noble Villa V', 'Town Hall H', 'Town Hall V'],
		limit: '1 per settlement',
		defense: 8,
	},
	{
		id: 15,
		name: 'Cathedral',
		description: 'The focal point of the settlement’s spiritual leadership.',
		cost: 58,
		size: 4,
		stability: 4,
		loyalty: 4,
		unrest: -4,
		discount: ['Academy H', 'Academy V', 'Temple H', 'Temple V'],
		limit: '1 per settlement',
		special: 'Halves Consumption for Promotion Edicts',
	},
	{
		id: 16,
		name: 'Cistern',
		description: 'Contains a safe supply of fresh water for the settlement.',
		cost: 6,
		size: 1,
		stability: 1,
		limit:
			'Cannot be adjacent to a Dump, Graveyard, Stable, Stockyard, or Tannery',
		special: 'Can share lot with another building',
	},
	{
		id: 17,
		name: 'Dance Hall',
		description:
			'An establishment for dancing, drinking, carousing, and holding celebrations.',
		cost: 4,
		size: 1,
		economy: 1,
		loyalty: 2,
		unrest: 1,
		limit: 'Adjacent to 1 house',
	},
	{
		id: 18,
		name: 'Dump',
		description: 'A centralized place to dispose of refuse.',
		cost: 4,
		size: 1,
		stability: 1,
		limit: 'Cannot be adjacent to House, Mansion, or Noble Villa',
	},
	// {
	//	id: 16,
	// 	name: 'Everflowing Spring',
	// 	description: 'A fountain built around several decanters of endless water that provides an inexhaustible supply of fresh water.',
	// 	cost: 5,
	// 	size: 0,
	// 	limit: 'Settlement must have a building that can create medium magic items',
	// 	special: 'Can share lot with Castle, Cathedral, Market, Monument, Park, or Town Hall'
	// },
	{
		id: 19,
		name: 'Exotic Artisan',
		description:
			'The shop and home of a jeweler, tinker, glassblower, or the like.',
		cost: 10,
		size: 1,
		economy: 1,
		stability: 1,
		limit: 'Adjacent to 1 house',
	},
	{
		id: 20,
		name: 'Foreign Quarter',
		description:
			'An area with many foreigners, as well as shops and services catering to them.',
		cost: 30,
		size: 4,
		economy: 3,
		stability: -1,
		special:
			'Increase the value of trade routes (see Trade Edicts) by 5% (maximum 100%)',
	},
	{
		id: 21,
		name: 'Foundry H',
		description: 'Processes ore and refines it into finished metal.',
		cost: 16,
		size: 2,
		economy: 1,
		stability: 1,
		unrest: 1,
		discount: ['Smithy'],
		limit: 'Adjacent to water district border',
		special:
			'Increase the Economy and BP earned per turn by 1 for 1 Mine connected to this settlement by a river or Road',
	},
	{
		id: 22,
		name: 'Foundry V',
		description: 'Processes ore and refines it into finished metal.',
		cost: 16,
		size: 2,
		economy: 1,
		stability: 1,
		unrest: 1,
		discount: ['Smithy'],
		limit: 'Adjacent to water district border',
		special:
			'Increase the Economy and BP earned per turn by 1 for 1 Mine connected to this settlement by a river or Road',
	},
	{
		id: 23,
		name: 'Garrison H',
		description:
			'A large building to house armies, train guards, and recruit militia.',
		cost: 28,
		size: 2,
		stability: 2,
		loyalty: 2,
		unrest: -2,
		discount: ['City Wall', 'Granary', 'Jail'],
	},
	{
		id: 24,
		name: 'Garrison V',
		description:
			'A large building to house armies, train guards, and recruit militia.',
		cost: 28,
		size: 2,
		stability: 2,
		loyalty: 2,
		unrest: -2,
		discount: ['City Wall', 'Granary', 'Jail'],
	},
	{
		id: 25,
		name: 'Granary',
		description: 'A place to store grain and food.',
		cost: 12,
		size: 1,
		stability: 1,
		loyalty: 1,
		special:
			'If Farms reduce Consumption below 0, store up to 5 BP of excess production for use on a later turn when Consumption exceeds the Treasury',
	},
	{
		id: 26,
		name: 'Graveyard',
		description: 'A plot of land to honor and bury the dead.',
		cost: 4,
		size: 1,
		loyalty: 1,
	},
	{
		id: 27,
		name: 'Guildhall H',
		description: 'The headquarters for a guild or similar organization.',
		cost: 34,
		size: 2,
		economy: 2,
		loyalty: 2,
		discount: ['Pier', 'Stable', 'Trade Shop'],
		baseValueIncrease: 1000,
	},
	{
		id: 28,
		name: 'Guildhall V',
		description: 'The headquarters for a guild or similar organization.',
		cost: 34,
		size: 2,
		economy: 2,
		loyalty: 2,
		discount: ['Pier', 'Stable', 'Trade Shop'],
		baseValueIncrease: 1000,
	},
	{
		id: 29,
		name: 'Herbalist',
		description: 'The workshop and home of a gardener, healer, or poisoner.',
		cost: 10,
		size: 1,
		stability: 1,
		loyalty: 1,
		limit: 'Adjacent to 1 house',
	},
	{
		id: 30,
		name: 'Hospital H',
		description: 'A building devoted to healing the sick.',
		cost: 30,
		size: 2,
		stability: 2,
		loyalty: 1,
		special: 'Increase Stability by 2 during plague events',
	},
	{
		id: 31,
		name: 'Hospital V',
		description: 'A building devoted to healing the sick.',
		cost: 30,
		size: 2,
		stability: 2,
		loyalty: 1,
		special: 'Increase Stability by 2 during plague events',
	},
	{
		id: 32,
		name: 'House',
		description: 'A number of mid-sized houses for citizens.',
		cost: 3,
		size: 1,
		unrest: -1,
		special:
			'The first House you build during the Improvement phase does not count against the total number of buildings you can build during the phase',
	},
	{
		id: 33,
		name: 'Inn',
		description: 'A place for visitors to rest.',
		cost: 10,
		size: 1,
		economy: 1,
		loyalty: 1,
		limit: 'Adjacent to 1 house',
		baseValueIncrease: 500,
	},
	{
		id: 34,
		name: 'Jail',
		description:
			'A fortified structure for confining criminals or dangerous monsters.',
		cost: 14,
		size: 1,
		stability: 2,
		loyalty: 2,
		unrest: -2,
	},
	{
		id: 35,
		name: 'Library',
		description: 'A large building containing an archive of books.',
		cost: 6,
		size: 1,
		economy: 1,
		loyalty: 1,
		upgradeTo: ['Academy H', 'Academy V'],
	},
	{
		id: 36,
		name: 'Luxury Store',
		description:
			'A shop that specializes in expensive comforts for the wealthy.',
		cost: 28,
		size: 1,
		economy: 1,
		limit: 'Adjacent to 1 House',
		upgradeTo: ['Magic Shop'],
		baseValueIncrease: 2000,
	},
	{
		id: 37,
		name: 'Magic Shop',
		description: 'A shop that specializes in magic items and spells.',
		cost: 68,
		size: 1,
		economy: 1,
		limit: 'Adjacent to 2 Houses',
		baseValueIncrease: 2000,
	},
	{
		id: 38,
		name: 'Magical Academy H',
		description:
			'An institution for training students in spellcasting, magic item crafting, and various arcane arts.',
		cost: 58,
		size: 2,
		economy: 2,
		discount: ["Caster's Tower", 'Library', 'Magic Shop'],
	},
	{
		id: 39,
		name: 'Magical Academy V',
		description:
			'An institution for training students in spellcasting, magic item crafting, and various arcane arts.',
		cost: 58,
		size: 2,
		economy: 2,
		discount: ["Caster's Tower", 'Library', 'Magic Shop'],
	},
	// {
	//	id: 33,
	// 	name: 'Magical Streetlamps',
	// 	description: 'Continual flame lamps that illuminate the lot.',
	// 	cost: 5,
	// 	size: 0,
	// 	limit: 'Settlement must have a Cathedral, Magic Shop, Magical Academy, or Temple',
	// 	special: 'Can share a lot with any building or improvement'
	// },
	{
		id: 40,
		name: 'Mansion',
		description: 'A single huge manor housing a rich family and its servants.',
		cost: 10,
		size: 1,
		stability: 1,
		upgradeTo: ['Noble Villa H', 'Noble Villa V'],
	},
	{
		id: 41,
		name: 'Market H',
		description: 'An open area for traveling merchants and bargain hunters.',
		cost: 48,
		size: 2,
		economy: 2,
		stability: 2,
		discount: ['Black Market', 'Inn', 'Shop'],
		limit: 'Adjacent to 2 Houses',
		baseValueIncrease: 2000,
	},
	{
		id: 42,
		name: 'Market V',
		description: 'An open area for traveling merchants and bargain hunters.',
		cost: 48,
		size: 2,
		economy: 2,
		stability: 2,
		discount: ['Black Market', 'Inn', 'Shop'],
		limit: 'Adjacent to 2 Houses',
		baseValueIncrease: 2000,
	},
	{
		id: 43,
		name: 'Menagerie',
		description:
			'A large park stocked with exotic creatures for public viewing.',
		cost: 16,
		size: 4,
		economy: 1,
		special:
			'Increase Loyalty by 1/4 the CR of the highest-CR creature in the Menagerie',
	},
	{
		id: 44,
		name: 'Military Academy H',
		description:
			'An institution dedicated to the study of war and the training of elite soldiers and officers.',
		cost: 36,
		size: 2,
		stability: 1,
		loyalty: 2,
		discount: ['Barracks'],
		limit: '1 per settlement',
		special:
			'Armies and commanders recruited at the settlement gain one bonus tactic (see Army Tactics)',
	},
	{
		id: 45,
		name: 'Military Academy V',
		description:
			'An institution dedicated to the study of war and the training of elite soldiers and officers.',
		cost: 36,
		size: 2,
		stability: 1,
		loyalty: 2,
		discount: ['Barracks'],
		limit: '1 per settlement',
		special:
			'Armies and commanders recruited at the settlement gain one bonus tactic (see Army Tactics)',
	},
	{
		id: 46,
		name: 'Mill',
		description: 'A building used to cut lumber or grind grain.',
		cost: 6,
		size: 1,
		economy: 1,
		stability: 1,
		limit: 'Adjacent to water district border',
		special:
			'With GM approval, you can construct a windmill at the same cost without the water district border requirement',
	},
	{
		id: 47,
		name: 'Mint',
		description:
			"A secure building where the kingdom's coinage is minted and standard weights and measures are kept.",
		cost: 30,
		size: 1,
		economy: 3,
		stability: 1,
		loyalty: 3,
	},
	{
		id: 48,
		name: 'Monastery H',
		description:
			'A cloister for meditation, study, and the pursuit of various other scholarly paths.',
		cost: 16,
		size: 2,
		stability: 1,
	},
	{
		id: 49,
		name: 'Monastery V',
		description:
			'A cloister for meditation, study, and the pursuit of various other scholarly paths.',
		cost: 16,
		size: 2,
		stability: 1,
	},
	{
		id: 50,
		name: 'Monument',
		description:
			'A local memorial such as a bell tower, a statue of a settlement founder, a large tomb, or a public display of art.',
		cost: 6,
		size: 1,
		loyalty: 1,
		unrest: -1,
	},
	{
		id: 51,
		name: 'Museum H',
		description:
			"A place to display art and artifacts both modern and historical. The GM may allow the kingdom leaders to display a valuable item (such as a magic item or bejeweled statue) in the museum, increasing Fame during this display by 1 for every 10,000 gp of the item's price (maximum +5 Fame), and by an additional 1 if the item is significant to the kingdom's history.",
		cost: 30,
		size: 2,
		economy: 1,
		loyalty: 1,
	},
	{
		id: 52,
		name: 'Museum V',
		description:
			"A place to display art and artifacts both modern and historical. The GM may allow the kingdom leaders to display a valuable item (such as a magic item or bejeweled statue) in the museum, increasing Fame during this display by 1 for every 10,000 gp of the item's price (maximum +5 Fame), and by an additional 1 if the item is significant to the kingdom's history.",
		cost: 30,
		size: 2,
		economy: 1,
		loyalty: 1,
	},
	{
		id: 53,
		name: 'Noble Villa H',
		description:
			"A sprawling manor with luxurious grounds that houses a noble's family and staff.",
		cost: 24,
		size: 2,
		economy: 1,
		stability: 1,
		loyalty: 1,
		discount: ['Exotic Artisan', 'Luxury Store', 'Mansion'],
	},
	{
		id: 54,
		name: 'Noble Villa V',
		description:
			"A sprawling manor with luxurious grounds that houses a noble's family and staff.",
		cost: 24,
		size: 2,
		economy: 1,
		stability: 1,
		loyalty: 1,
		discount: ['Exotic Artisan', 'Luxury Store', 'Mansion'],
	},
	{
		id: 55,
		name: 'Observatory',
		description:
			'A dome or tower with optical devices for viewing the heavens.',
		cost: 12,
		size: 1,
		stability: 1,
	},
	{
		id: 56,
		name: 'Orphanage',
		description:
			'A place for housing and taking care of large numbers of orphans.',
		cost: 6,
		size: 1,
		stability: 1,
		unrest: -1,
	},
	{
		id: 57,
		name: 'Palace',
		description:
			"A grand edifice and walled grounds demonstrating one's wealth, power, and authority to the world.",
		cost: 108,
		size: 4,
		economy: 2,
		stability: 2,
		loyalty: 6,
		discount: ['Mansion', 'Mint', 'Noble Villa H', 'Noble Villa V'],
		baseValueIncrease: 1000,
		special:
			'You may make two special edicts per turn, but take a –2 penalty on kingdom checks associated with each special edict',
	},
	{
		id: 58,
		name: 'Park',
		description: 'A plot of land set aside for its serene beauty.',
		cost: 4,
		size: 1,
		loyalty: 1,
		unrest: -1,
	},
	{
		id: 59,
		name: 'Pier',
		description:
			'Warehouses and workshops for docking ships and handling cargo and passengers.',
		cost: 16,
		size: 1,
		economy: 1,
		stability: 1,
		limit: 'Adjacent to water district border',
		upgradeTo: ['Waterfront'],
		baseValueIncrease: 1000,
	},
	{
		id: 60,
		name: 'Shop',
		description: 'A general store.',
		cost: 8,
		size: 1,
		economy: 1,
		limit: 'Adjacent to 1 House or Mansion',
		upgradeTo: ['Luxury Store', 'Market H', 'Market V'],
		baseValueIncrease: 500,
	},
	{
		id: 61,
		name: 'Shrine',
		description:
			'A shrine, idol, sacred grove, or similar holy site designed for worship by pious individuals.',
		cost: 8,
		size: 1,
		loyalty: 1,
		unrest: -1,
		upgradeTo: ['Temple H', 'Temple V'],
	},
	{
		id: 62,
		name: 'Smithy',
		description:
			'The workshop of an armorsmith, blacksmith, weaponsmith, or other craftsman who works with metal.',
		cost: 6,
		size: 1,
		economy: 1,
		stability: 1,
	},
	{
		id: 63,
		name: 'Stable',
		description: 'A structure for housing or selling horses and other mounts.',
		cost: 10,
		size: 1,
		economy: 1,
		loyalty: 1,
		limit: 'Adjacent to 1 House, Mansion, or Noble Villa',
		baseValueIncrease: 500,
	},
	{
		id: 64,
		name: 'Stockyard',
		description:
			'Barns and pens that store herd animals and prepare them for nearby slaughterhouses.',
		cost: 20,
		size: 4,
		economy: 1,
		stability: -1,
		discount: ['Stable', 'Tannery'],
		special:
			'Farms in this hex or adjacent hexes reduce Consumption by 3 instead of 2',
	},
	{
		id: 65,
		name: 'Tannery',
		description: 'A structure that prepares hides and leather.',
		cost: 6,
		size: 1,
		economy: 1,
		stability: 1,
		limit: 'Cannot be adjacent to House, Mansion, Noble Villa, or Tenement',
	},
	{
		id: 66,
		name: 'Tavern',
		description: 'An eating or drinking establishment.',
		cost: 12,
		size: 1,
		economy: 1,
		loyalty: 1,
		limit: 'Adjacent to 1 House or Mansion',
		baseValueIncrease: 500,
	},
	{
		id: 67,
		name: 'Temple H',
		description: 'A large place of worship dedicated to a deity.',
		cost: 32,
		size: 2,
		stability: 2,
		loyalty: 2,
		unrest: -2,
		discount: ['Graveyard', 'Monument', 'Shrine'],
	},
	{
		id: 68,
		name: 'Temple V',
		description: 'A large place of worship dedicated to a deity.',
		cost: 32,
		size: 2,
		stability: 2,
		loyalty: 2,
		unrest: -2,
		discount: ['Graveyard', 'Monument', 'Shrine'],
	},
	{
		id: 69,
		name: 'Tenement',
		description: 'A staggering number of low-rent housing units.',
		cost: 1,
		size: 1,
		unrest: 2,
		upgradeTo: ['House'],
		special: 'Counts as House for buildings that must be adjacent to a House',
	},
	{
		id: 70,
		name: 'Theater H',
		description:
			'A venue for entertainments such as plays, operas, and concerts.',
		cost: 24,
		size: 2,
		economy: 2,
		stability: 2,
		discount: ['Exotic Artisan', 'Inn', 'Park', 'Tavern'],
		upgradeTo: ['Arena'],
	},
	{
		id: 71,
		name: 'Theater V',
		description:
			'A venue for entertainments such as plays, operas, and concerts.',
		cost: 24,
		size: 2,
		economy: 2,
		stability: 2,
		discount: ['Exotic Artisan', 'Inn', 'Park', 'Tavern'],
		upgradeTo: ['Arena'],
	},
	{
		id: 72,
		name: 'Town Hall H',
		description:
			'A public venue for town meetings, repository for town records, and offices for minor bureaucrats.',
		cost: 22,
		size: 2,
		economy: 1,
		stability: 1,
		loyalty: 1,
		discount: ['Barracks', 'Cistern', 'Dump', 'Jail', 'Watchtower'],
	},
	{
		id: 73,
		name: 'Town Hall V',
		description:
			'A public venue for town meetings, repository for town records, and offices for minor bureaucrats.',
		cost: 22,
		size: 2,
		economy: 1,
		stability: 1,
		loyalty: 1,
		discount: ['Barracks', 'Cistern', 'Dump', 'Jail', 'Watchtower'],
	},
	{
		id: 74,
		name: 'Trade Shop',
		description:
			'A shop front for a tradesperson, such as a baker, butcher, candle maker, cobbler, rope maker, or wainwright.',
		cost: 10,
		size: 1,
		economy: 1,
		stability: 1,
		limit: 'Adjacent to 1 House',
		upgradeTo: ['Guildhall H', 'Guildhall V'],
		baseValueIncrease: 500,
	},
	{
		id: 75,
		name: 'University',
		description:
			'An institution of higher learning, focusing mainly on mundane subjects but dabbling in magical theory.',
		cost: 78,
		size: 4,
		economy: 3,
		loyalty: 3,
		discount: [
			'Academy H',
			'Academy V',
			'Bardic College H',
			'Bardic College V',
			'Library',
			'Magical Academy H',
			'Magical Academy V',
			'Military Academy H',
			'Military Academy V',
			'Museum H',
			'Museum V',
		],
	},
	{
		id: 76,
		name: 'Watchtower',
		description: 'A tall structure that serves as a guard post.',
		cost: 12,
		size: 1,
		stability: 1,
		unrest: -1,
		defense: 2,
	},
	{
		id: 77,
		name: 'Waterfront',
		description:
			'A port for waterborne arrival and departure, with facilities for shipping and shipbuilding.',
		cost: 90,
		size: 4,
		economy: 4,
		discount: [
			'Black Market',
			'Guildhall H',
			'Guildhall V',
			'Market H',
			'Market V',
			'Pier',
		],
		limit: 'Adjacent to water district border, 1 per settlement',
		baseValueIncrease: 4000,
		special: 'Halves Loyalty penalty for Taxation edicts',
	},
	{
		id: 78,
		name: 'Waterway', // NA
		description:
			"A river or canal occupying part of the District Grid. At the GM's option, a natural Waterway may already exist on the grid, requiring no action or BP to build. If you construct a City Wall that touches or crosses the Waterway, you must also build Watergates on the same turn.",
		cost: 3,
		size: 1 || 2,
		special:
			'Counts as water district border, with facilities for shipping and shipbuilding',
	},
];
