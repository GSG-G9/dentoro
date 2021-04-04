const checkAvailableTimes = (value) => {
  const openinigTime = 8;
  const closeingTime = 18;
  const times = new Set(
    new Array(24).fill(0).reduce((total, item, index) => {
      let newIndex = index + 1;
      if (newIndex >= openinigTime && newIndex <= closeingTime) {
        if (newIndex < 10) {
          newIndex = `0${newIndex}`;
        }
        total.push(`${newIndex}:00:00`);
      }
      return total;
    }, []),
  );
  return times.has(value);
};

module.exports = checkAvailableTimes;
