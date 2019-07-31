function fixNegativeIndex(index: number, arrayLength: number): number {
    if (index < 0) {
        const countOfOver = Math.floor(-index / arrayLength);
        return index + arrayLength * (countOfOver + 1);
    }
    return index;
}

function arrayOverAt<T>(array: T[], index: number): T {
    const fixedIndex = fixNegativeIndex(index, array.length);
    return array[fixedIndex % array.length];
}

export default arrayOverAt;
