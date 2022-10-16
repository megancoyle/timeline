import { sortItems } from "./formatItems";

export const getEndDate = (items) => {
  const sortedItems = sortItems(items);
  const endDate = sortedItems[sortedItems.length - 1].end;

  return new Date(endDate);
};

export const getStartDate = (items) => {
  const sortedItems = sortItems(items);
  const startDate = sortedItems[0].start;

  return new Date(startDate);
};
