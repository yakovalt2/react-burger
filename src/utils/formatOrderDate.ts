export default function formatOrderDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const timezoneOffset = -date.getTimezoneOffset() / 60;

  const timezoneStr = `i-GMT${timezoneOffset >= 0 ? "+" : ""}${timezoneOffset}`;

  return `${
    isToday ? "Сегодня" : date.toLocaleDateString()
  }, ${hours}:${minutes} ${timezoneStr}`;
}
