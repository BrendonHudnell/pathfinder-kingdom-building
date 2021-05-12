export function signedNumber(number: number): string {
	if (number > 0) {
		return '+' + number;
	} else {
		return number.toString();
	}
}
