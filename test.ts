function multiplicator (a: number, b: number): number {
		return a * b;
}

console.log(process.argv);

const a: number = Number(process.argv[2]);
const b: number = Number(process.argv[3]);

console.log(multiplicator(a, b));