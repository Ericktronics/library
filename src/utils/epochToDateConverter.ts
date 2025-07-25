export const epochToDate = (epochTime: number) => {
  const date = new Date(epochTime * 1000); // Multiply by 1000 to convert seconds to milliseconds
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
