module.exports = {
  fromName(fileName) {
    return new Date(
      Number(fileName.slice(0, 4)),
      Number(fileName.slice(4, 6) - 1),
      Number(fileName.slice(6, 8)),
      Number(fileName.slice(8, 10)),
      Number(fileName.slice(10, 12)),
      Number(fileName.slice(12, 14))
    );
  },
  parse(date) {
    if (!date) return undefined;
    const dateParts = date.split('/');
    return new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0]),
      0,
      0,
      0,
      0
    );
  },
};
