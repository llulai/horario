const colorCycle = [
  'bg-[#FFE0E0] text-[#D43C3C]',
  'bg-[#ECE0FF] text-[#4C1D95]',
  'bg-[#E0E9FF] text-[#1C4ED8]',
  'bg-[#FFEEE0] text-[#B4540A]',
  'bg-[#FFE0EA] text-[#881337]',
  'bg-[#E0F8FF] text-[#1E7B94]',
  'bg-[#E0FFEB] text-[#17803D]',
  'bg-[#FFE0ED] text-[#BE195D]',
  'bg-[#FFF4CF] text-[#8C6E0B]',
  'bg-[#E0F7FF] text-[#164E63]',
  'bg-[#FFEEE0] text-[#A84F09]',
  'bg-[#0D9488]/20 text-[#0D9488]',
  'bg-[#0891B2]/20 text-[#0891B2]',
  'bg-[#B91C1C]/20 text-[#B91C1C]',
  'bg-[#A78BFA]/20 text-[#A78BFA]',
  'bg-[#C2410C]/20 text-[#C2410C]',
  'bg-[#65A30D]/20 text-[#65A30D]',
  'bg-[#6D28D9]/20 text-[#6D28D9]'
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
