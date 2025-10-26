const getShortLabel = (name: string) => {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('.');
};

export const getVersionStatus = (numberOfEpisodes: number, mediaType: string, version: Version) => {
  let label: string;
  if (mediaType === 'series') {
    const total = numberOfEpisodes || 0;
    label = `${getShortLabel(version.name)} ${version.currentEp}/${total}`;
  } else {
    label = `${getShortLabel(version.name)} Full`;
  }

  const isFull =
    label.toLowerCase().includes('full') ||
    (/\b(\d+)\/(\d+)\b/.test(label) &&
      (() => {
        const match = /(\d+)\/(\d+)/.exec(label);
        if (!match) return false;
        const [current, total] = match.slice(1).map(Number);
        return current === total;
      })());

  return { label, isFull };
};
