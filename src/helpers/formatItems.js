export const sortItems = (items) => {
  return items.sort((a, b) => new Date(a.start) - new Date(b.start));
};

/**
 * Takes an array of items and assigns them to lanes based on start/end dates.
 * @returns an array of arrays containing items.
 */

export const assignLanes = (items) => {
  const sortedItems = sortItems(items);
  const lanes = [];

  function assignItemToLane(item) {
    for (const lane of lanes) {
      if (new Date(lane[lane.length - 1].end) < new Date(item.start)) {
        lane.push(item);
        return;
      }
    }
    lanes.push([item]);
  }

  for (const item of sortedItems) {
    assignItemToLane(item);
  }
  return lanes;
};
