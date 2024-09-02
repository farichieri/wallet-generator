export const getEthereumDerivationPath = (index: number): string => {
  return `m/44'/60'/${index}'/0'`;
};

export const getSolanaDerivationPath = (index: number): string => {
  return `m/44'/501'/${index}'/0'`;
};

export const getNewEthereumDerivationPath = (
  currentDerivationPaths: string[],
): string => {
  console.log({ currentDerivationPaths });
  const indexes = currentDerivationPaths
    .map((path) => {
      const match = path.match(/^m\/44'\/60'\/(\d+)'\/0'?$/);
      return match ? parseInt(match[1], 10) : null;
    })
    .filter((index): index is number => index !== null);

  const maxIndex = indexes.length > 0 ? Math.max(...indexes) : -1;

  return getEthereumDerivationPath(maxIndex + 1);
};

export const getNewSolanaDerivationPath = (
  currentDerivationPaths: string[],
): string => {
  const indexes = currentDerivationPaths
    .map((path) => {
      const match = path.match(/^m\/44'\/501'\/(\d+)'\/0'?$/);
      return match ? parseInt(match[1], 10) : null;
    })
    .filter((index): index is number => index !== null);

  const maxIndex = indexes.length > 0 ? Math.max(...indexes) : -1;

  return getSolanaDerivationPath(maxIndex + 1);
};
