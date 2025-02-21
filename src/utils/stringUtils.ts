export function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function getRandomSong(): string {
  const songIds = ['1', '2', '3', '4', '5', '6'];
  const randomIndex = Math.floor(Math.random() * songIds.length);
  return songIds[randomIndex];
}