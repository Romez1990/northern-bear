interface Array<T> {
  insert(item: T, atEnd: boolean): void;
  remove(atEnd: boolean): void;
  atBeyond(index: number): T;
}

Array.prototype.insert = function(item, atEnd) {
  if (atEnd) this.push(item);
  else this.unshift(item);
};

Array.prototype.remove = function(atEnd) {
  if (atEnd) this.pop();
  else this.shift();
};

function fixNegativeIndex(index: number, arrayLength: number): number {
  if (index < 0) {
    const countOfOver = Math.floor(-index / arrayLength);
    return index + arrayLength * (countOfOver + 1);
  }
  return index;
}

Array.prototype.atBeyond = function(index) {
  const fixedIndex = fixNegativeIndex(index, this.length);
  return this[fixedIndex % this.length];
};
