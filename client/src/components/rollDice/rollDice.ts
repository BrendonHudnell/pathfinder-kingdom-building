export type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';

export function rollDice(type: DiceType, number = 1): number {
	let max = 0;
	if (type === 'd4') {
		max = 4;
	} else if (type === 'd6') {
		max = 6;
	} else if (type === 'd8') {
		max = 8;
	} else if (type === 'd10') {
		max = 10;
	} else if (type === 'd12') {
		max = 12;
	} else if (type === 'd20') {
		max = 20;
	} else {
		max = 100;
	}

	let total = 0;
	for (let i = 0; i < number; i++) {
		total += Math.floor(Math.random() * max) + 1;
	}

	return total;
}
