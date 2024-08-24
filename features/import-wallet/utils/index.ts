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
  // Adjusted regex to match paths ending with /0 or /0'
  const indices = currentDerivationPaths
    .map((path) => {
      const match = path.match(/^m\/44'\/60'\/(\d+)'\/0'?$/);
      return match ? parseInt(match[1], 10) : null;
    })
    .filter((index): index is number => index !== null);

  console.log({ indices });
  // Find the maximum index, default to -1 if no valid paths are found
  const maxIndex = indices.length > 0 ? Math.max(...indices) : -1;

  // Generate a new path with an index incremented by 1
  return getEthereumDerivationPath(maxIndex + 1);
};
