const colorCycle = [
  'bg-[#EF4444]',
  'bg-[#15803D]',
  'bg-[#4C1D95]',
  'bg-[#BE185D]',
  'bg-[#1D4ED8]',
  'bg-[#F97316]',
  'bg-[#B45309]',
  'bg-[#164E63]',
  'bg-[#881337]',
  'bg-[#60A5FA]',
  'bg-[#C026D3]',
  'bg-[#0D9488]',
  'bg-[#0891B2]',
  'bg-[#B91C1C]',
  'bg-[#A78BFA]',
  'bg-[#C2410C]',
  'bg-[#65A30D]',
  'bg-[#6D28D9]'
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
