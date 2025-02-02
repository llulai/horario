export const formatComplexity = (complexity: bigint) => {
  const regex = new RegExp(/.*E(\d+)/);
  const parsedComplexity = complexity.toLocaleString('es-CL', {
    notation: 'scientific',
    maximumFractionDigits: 3
  });

  const match = regex.exec(parsedComplexity);

  if (match && match.length >= 2) {
    return match[1];
  }

  return parsedComplexity;
};

export const formatCompletion = (completion: number) => {
  return Math.round(completion * 100).toString() + '%';
};
