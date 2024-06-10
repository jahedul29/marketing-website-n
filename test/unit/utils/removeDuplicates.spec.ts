import { test, expect } from 'vitest';
import {
	removeDuplicatesObjectsFromArray,
	removeDuplicatesValuesFromArray
} from '$lib/utils/array/removeDuplicates';

describe('removeDuplicatesObjectsFromArray', () => {
	test('should remove duplicates from an array of objects, keeping last duplicate', () => {
		const arr = [
			{ id: 1, name: 'John' },
			{ id: 2, name: 'Jane' },
			{ id: 1, name: 'John2' },
			{ id: 2, name: 'Jane2' }
		];

		expect(removeDuplicatesObjectsFromArray(arr, 'id')).toEqual([
			{ id: 1, name: 'John2' },
			{ id: 2, name: 'Jane2' }
		]);
	});
});

describe('removeDuplicatesValuesFromArray', () => {
	test('should remove duplicates from an array of values', () => {
		const arr = [1, 2, 1, 2];
		expect(removeDuplicatesValuesFromArray(arr)).toEqual([1, 2]);
	});
});
