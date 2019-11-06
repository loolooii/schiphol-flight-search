import { arrayUnion, prepareInput } from '../src/utils/utils';

test('Input space is removed and lowerCased', () => {
    expect(prepareInput("UA 969")).toBe("ua969");
    expect(prepareInput("San Francisco")).toBe("sanfrancisco");
});

test('Arrays are unified correctly', () => {
    const arr1 = [1, 2];
    const arr2 = [1];
    expect(arrayUnion(arr1, arr2).sort()).toEqual([1,2,1].sort());
});