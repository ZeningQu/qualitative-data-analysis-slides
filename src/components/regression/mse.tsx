export function mse(a:number[], b:number[]): number {
  if (a.length !== b.length) {
    throw new Error('mse(): expected two input number[] arrays to have equal length.');
  }

	let error = 0
	for (let i = 0; i < a.length; i++) {
		error += Math.pow((b[i] - a[i]), 2)
	}
	return error / a.length
}
