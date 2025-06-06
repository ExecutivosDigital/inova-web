export function maskDigits(value: string) {
  if (!value) {
    return "";
  }
  value = value.replace(/\D/g, "");
  return value;
}

export function maskPhone(value: string) {
  if (!value) {
    return "";
  }
  value = value.replace(/\D/g, "");
  // (11)1111-1111
  value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
}

export function maskCurrency(value: string | number) {
  const stringValue = typeof value === "number" ? value.toString() : value;
  if (!stringValue) {
    return "";
  }
  const cleanedValue = stringValue.replace(/\D/g, "");
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(cleanedValue) / 100);
}
