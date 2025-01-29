const colorCycle = [
  'bg-[#ea580c]',
  'bg-[#DB2777]',
  'bg-[#2563EB]',
  'bg-[#059669]',
  'bg-[#DC2626]',
  'bg-[#FBBF24]',
  'bg-[#5EEAD4]',
  'bg-[#9333EA]',
  'bg-[#22D3EE]',
  'bg-[#65A30D]',
  'bg-[#E879F9]'
] as const;

const createGetColor = () => {
  // Separate indices for subjects and class groups
  let subjectIndex = 0;
  let classGroupIndex = 0;

  // Mappings for assigned colors
  const subjectColors: Record<string, string> = {};
  const classColors: Record<string, string> = {};

  // Retrieve or assign a color for a given name
  const getColor = (name: string, show: 'subjectName' | 'gradeName'): string => {
    const isSubject = show === 'subjectName';
    const colorMap = isSubject ? subjectColors : classColors;

    // If a color already exists for the name, return it
    if (colorMap[name]) {
      return colorMap[name];
    }

    // Otherwise, assign a new color from the cycle
    const index = isSubject ? subjectIndex : classGroupIndex;
    const color = colorCycle[index % colorCycle.length];
    colorMap[name] = color;

    // Increment the relevant index
    if (isSubject) {
      subjectIndex++;
    } else {
      classGroupIndex++;
    }

    return color;
  };

  // Explicitly set a new color for a name, overriding any previous assignment
  const setColor = (name: string, show: 'subjectName' | 'gradeName', newColor: string): void => {
    const isSubject = show === 'subjectName';
    const colorMap = isSubject ? subjectColors : classColors;

    // Assign the new color, overriding any existing value
    colorMap[name] = newColor;
  };

  return { getColor, setColor };
};

// Create instances of getColor and setColor
const { getColor, setColor } = createGetColor();

// Export the functions
export { getColor, setColor };
