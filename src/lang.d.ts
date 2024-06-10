declare global {
	/**
	 * Allow `null` to be a valid value for `T`.
	 */
	type Maybe<T> = T | null;

	/**
	 * Allow `undefined` to be a valid value for `T`.
	 */
	type MaybeUndefined<T> = T | undefined;

	/**
	 * Copy the maybe-ness of `T` to `U`.
	 * If `T` is a nullable type, wrap `U` in `Maybe`, otherwise, `U` is `NonNullable`.
	 */
	type MaybeCopy<T, U> = T extends null ? Maybe<U> : NonNullable<U>;

	/**
	 * If `T` is a non-nullable subtype of `U`, return `T`, otherwise, return `null`.
	 * This is useful for narrowing types from `Maybe<T>` to either non-null `T`, `Maybe<T>` or `null`.
	 * This situation can arise when using `Maybe<T>` as a parameter and `Maybe<U>` as a return type.
	 */
	type MaybeUnwrap<T, U> = T extends U ? (T extends null ? never : T) : null;

	type Mutable<T> = T extends object
		? {
				-readonly [K in keyof T]: T[K];
		  }
		: T;
	// From: https://stackoverflow.com/questions/53832989/typescript-recursive-deep-mutable-with-generics-error-t-is-not-assignable-to
	type DeepMutable<T> = T extends object
		? {
				-readonly [K in keyof T]: DeepMutable<T[K]>;
		  }
		: T;

	type ToString<T> = T extends string ? string : T;
	type DeepToString<T> = T extends object
		? {
				[K in keyof T]: DeepToString<T[K]>;
		  }
		: ToString<T>;

	type DeepTo<X, T> = T extends object
		? {
				[K in keyof T]: DeepTo<X, T[K]>;
		  }
		: T extends Array<infer U>
		? Array<DeepTo<X, U>>
		: T extends boolean
		? boolean
		: T extends number
		? number
		: T extends string
		? string
		: X;

	type PropertyStringPath<T extends object, Prefix extends string = ''> = {
		[K in keyof T]: K extends string
			? T[K] extends object
				? `${Prefix}${K}` | PropertyStringPath<T[K], `${Prefix}${K}.`>
				: `${Prefix}${K}`
			: never;
	}[keyof T];
}

// Create an empty module so typescript will import it
export {};
