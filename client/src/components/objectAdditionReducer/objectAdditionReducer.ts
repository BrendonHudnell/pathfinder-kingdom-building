export function objectAdditionReducer<T>(accumulator: T, currentValue: T): T {
	for (const [key, value] of Object.entries(currentValue)) {
		accumulator[key as keyof T] += value;
	}

	return accumulator;
}
