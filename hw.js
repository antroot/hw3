class Validation {
	states = new Set();
	constructor(args) {
		this.criteria = args;
		this.states = Array.isArray(this.criteria) ? new Set(this.criteria) : this.states;
	}

	toggleValidation(name, state = null) {
		this.criteria.forEach((item) => {
			if (item.name === name) {
				if (state === null) {
					this.states.has(item) ? this.states.delete(item) : this.states.add(item);
				} else {
					state ? this.states.add(item) : this.states.delete(item);
				}
			}
		});
	}

	validate(value) {
		let errors = new Map();
		let isValid = true;
		for (let item of this.states) {
			if (!item.check(value)) {
				errors.set(item.name, item.message(value));
				isValid = false;
			}
		}
		return {
			valid: isValid,
			errors: errors,
		};
	}
}

let objArr = [
	{
		name: 'Number',
		check: value => {
			return !isNaN(parseFloat(value));

		},
		message: value => {
			return `${value} is not a Number`;
		}
	},
	{
		name: 'String',
		check: value => {
			return typeof value === 'string';

		},
		message: value => {
			return `${value} is not a String`;
		}
	}
];

let validation = new Validation(objArr);
console.log(validation.validate(2));

