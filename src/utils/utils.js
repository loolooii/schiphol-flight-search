// I think in the case that flight numbers contain a space between the first two characters and digits,
// it's important to remove the spaces when comparing query with result. An example
// is when user searches for "ua9". In this case we should show the flights with flight numbers "UA 969" and "UA 989".
// Lowercase is obviously used to ignore the case in which the users performs their search
export const prepareInput = (input) => {
    const withoutSpace = input.replace(/\s/g, '');
    return withoutSpace.toLowerCase();
};

// to be honest just to be able to write one more test :)
// otherwise a bit of an overkill
export const arrayUnion = (array1, array2) => {
    return [...array1, ...array2];
};