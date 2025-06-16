export const parseStringToCurrency = (value: string) => {
  if (!value) return "R$ 0,00";

  const parsedValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
  if (isNaN(parsedValue)) return "R$ 0,00";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(parsedValue);
};

export const parseStringToPercentage = (value: string) => {
  if (!value) return "0%";

  const parsedValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
  if (isNaN(parsedValue)) return "0%";

  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parsedValue / 100);
};

export const parseDateToLocaleString = (date: Date) => {
  if (!date) return "";
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return "";
  return parsedDate.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
