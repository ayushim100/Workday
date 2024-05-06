export const employeesOptions = [
  { label: "1-10", value: "1-10" },
  { label: "11-20", value: "11-20" },
  { label: "21-50", value: "21-50" },
  { label: "51-100", value: "51-100" },
  { label: "101-200", value: "101-200" },
  { label: "201-500", value: "201-500" },
  { label: "500+", value: "500+" }
];

export const experienceOptions = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
  { label: "6", value: 6 },
  { label: "7", value: 7 },
  { label: "8", value: 8 },
  { label: "9", value: 9 },
  { label: "10", value: 10 }
];

export const locationOptions = [
  { label: "Remote", value: "Remote" },
  { label: "Hybrid", value: "Hybrid" },
  { label: "In-office", value: "In-office" }
];

export const BasepayOptions = [
  { label: "0L", value: 0 },
  { label: "10L", value: 10 },
  { label: "20L", value: 20 },
  { label: "30L", value: 30 },
  { label: "40L", value: 40 },
  { label: "50L", value: 50 },
  { label: "60L", value: 60 },
  { label: "70L", value: 70 }
];

export interface RoleOptions {
  readonly value: string;
  readonly label: string;
}

export interface GroupedOption {
  readonly label: string;
  readonly options: RoleOptions[];
}

export const engineeringOptions: readonly RoleOptions[] = [
  { label: "Backend", value: "Backend" },
  { label: "Frontend", value: "Frontend" },
  { label: "Fullstack", value: "Fullstack" },
  { label: "IOS", value: "IOS" },
  { label: "Flutter", value: "Flutter" },
  { label: "React Native", value: "React Native" },
  { label: "Android", value: "Android" },
  { label: "Tech Lead", value: "Tech Lead" },
  { label: "Dev-Ops", value: "Dev-Ops" },
  { label: "Data Engineer", value: "Data Engineer" },
]

export const designOptions: readonly RoleOptions[] = [
  { label: "Designer", value: "Designer" },
  { label: "Design Manager", value: "Design Manager" },
]

export const groupedOptions = [
  {
    label: 'ENGINEERING',
    options: engineeringOptions,
  },
  {
    label: 'DESIGN',
    options: designOptions,
  }
];
