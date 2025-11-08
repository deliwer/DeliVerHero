export interface iPhoneModel {
  id: string;
  name: string;
  series: string;
  releaseYear: number;
  storageOptions: string[];
  colors: string[];
  startingPrice: number;
  image?: string;
  isPro: boolean;
  isPlus: boolean;
  displaySize: string;
  features: string[];
}

export const IPHONE_CATALOG: iPhoneModel[] = [
  {
    id: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    series: "17",
    releaseYear: 2025,
    storageOptions: ["256GB", "512GB", "1TB", "2TB"],
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
    startingPrice: 1199,
    image: "@assets/generated_images/iPhone_17_Pro_Max_Blue_5527e769.png",
    isPro: true,
    isPlus: false,
    displaySize: "6.9\"",
    features: ["A19 Pro chip", "Triple camera system", "ProMotion display", "Titanium design", "Action button"]
  },
  {
    id: "iphone-17-pro",
    name: "iPhone 17 Pro",
    series: "17",
    releaseYear: 2025,
    storageOptions: ["128GB", "256GB", "512GB", "1TB"],
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
    startingPrice: 999,
    image: "@assets/generated_images/iPhone_17_Pro_Natural_102f756e.png",
    isPro: true,
    isPlus: false,
    displaySize: "6.3\"",
    features: ["A19 Pro chip", "Triple camera system", "ProMotion display", "Titanium design", "Action button"]
  },
  {
    id: "iphone-17-plus",
    name: "iPhone 17 Plus",
    series: "17",
    releaseYear: 2025,
    storageOptions: ["128GB", "256GB", "512GB"],
    colors: ["Black", "Blue", "Pink", "White", "Green"],
    startingPrice: 899,
    image: "@assets/generated_images/iPhone_17_Plus_Black_07e48dac.png",
    isPro: false,
    isPlus: true,
    displaySize: "6.7\"",
    features: ["A19 chip", "Dual camera system", "Super Retina XDR display", "Ceramic Shield"]
  },
  {
    id: "iphone-17",
    name: "iPhone 17",
    series: "17",
    releaseYear: 2025,
    storageOptions: ["128GB", "256GB", "512GB"],
    colors: ["Black", "Blue", "Pink", "White", "Green"],
    startingPrice: 799,
    image: "@assets/generated_images/iPhone_17_White_c97e6eb6.png",
    isPro: false,
    isPlus: false,
    displaySize: "6.1\"",
    features: ["A19 chip", "Dual camera system", "Super Retina XDR display", "Ceramic Shield"]
  },
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    series: "16",
    releaseYear: 2024,
    storageOptions: ["256GB", "512GB", "1TB"],
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
    startingPrice: 1099,
    isPro: true,
    isPlus: false,
    displaySize: "6.9\"",
    features: ["A18 Pro chip", "Triple camera system", "ProMotion display", "Titanium design"]
  },
  {
    id: "iphone-16-pro",
    name: "iPhone 16 Pro",
    series: "16",
    releaseYear: 2024,
    storageOptions: ["128GB", "256GB", "512GB", "1TB"],
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
    startingPrice: 999,
    isPro: true,
    isPlus: false,
    displaySize: "6.3\"",
    features: ["A18 Pro chip", "Triple camera system", "ProMotion display", "Titanium design"]
  },
  {
    id: "iphone-16-plus",
    name: "iPhone 16 Plus",
    series: "16",
    releaseYear: 2024,
    storageOptions: ["128GB", "256GB", "512GB"],
    colors: ["Black", "White", "Pink", "Teal", "Ultramarine"],
    startingPrice: 899,
    isPro: false,
    isPlus: true,
    displaySize: "6.7\"",
    features: ["A18 chip", "Dual camera system", "Ceramic Shield"]
  },
  {
    id: "iphone-16",
    name: "iPhone 16",
    series: "16",
    releaseYear: 2024,
    storageOptions: ["128GB", "256GB", "512GB"],
    colors: ["Black", "White", "Pink", "Teal", "Ultramarine"],
    startingPrice: 799,
    isPro: false,
    isPlus: false,
    displaySize: "6.1\"",
    features: ["A18 chip", "Dual camera system", "Ceramic Shield"]
  },
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    series: "15",
    releaseYear: 2023,
    storageOptions: ["256GB", "512GB", "1TB"],
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
    startingPrice: 1099,
    isPro: true,
    isPlus: false,
    displaySize: "6.7\"",
    features: ["A17 Pro chip", "Triple camera system", "ProMotion display", "Titanium design"]
  },
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    series: "15",
    releaseYear: 2023,
    storageOptions: ["128GB", "256GB", "512GB", "1TB"],
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
    startingPrice: 999,
    isPro: true,
    isPlus: false,
    displaySize: "6.1\"",
    features: ["A17 Pro chip", "Triple camera system", "ProMotion display", "Titanium design"]
  },
  {
    id: "iphone-15-plus",
    name: "iPhone 15 Plus",
    series: "15",
    releaseYear: 2023,
    storageOptions: ["128GB", "256GB", "512GB"],
    colors: ["Black", "Blue", "Green", "Yellow", "Pink"],
    startingPrice: 899,
    isPro: false,
    isPlus: true,
    displaySize: "6.7\"",
    features: ["A16 Bionic chip", "Dual camera system", "Ceramic Shield"]
  },
  {
    id: "iphone-15",
    name: "iPhone 15",
    series: "15",
    releaseYear: 2023,
    storageOptions: ["128GB", "256GB", "512GB"],
    colors: ["Black", "Blue", "Green", "Yellow", "Pink"],
    startingPrice: 799,
    isPro: false,
    isPlus: false,
    displaySize: "6.1\"",
    features: ["A16 Bionic chip", "Dual camera system", "Ceramic Shield"]
  },
  {
    id: "iphone-14-pro-max",
    name: "iPhone 14 Pro Max",
    series: "14",
    releaseYear: 2022,
    storageOptions: ["128GB", "256GB", "512GB", "1TB"],
    colors: ["Space Black", "Silver", "Gold", "Deep Purple"],
    startingPrice: 1099,
    isPro: true,
    isPlus: false,
    displaySize: "6.7\"",
    features: ["A16 Bionic chip", "Dynamic Island", "Triple camera system", "ProMotion"]
  },
  {
    id: "iphone-14-pro",
    name: "iPhone 14 Pro",
    series: "14",
    releaseYear: 2022,
    storageOptions: ["128GB", "256GB", "512GB", "1TB"],
    colors: ["Space Black", "Silver", "Gold", "Deep Purple"],
    startingPrice: 999,
    isPro: true,
    isPlus: false,
    displaySize: "6.1\"",
    features: ["A16 Bionic chip", "Dynamic Island", "Triple camera system", "ProMotion"]
  },
  {
    id: "iphone-14-plus",
    name: "iPhone 14 Plus",
    series: "14",
    releaseYear: 2022,
    storageOptions: ["128GB", "256GB", "512GB"],
    colors: ["Midnight", "Purple", "Starlight", "Blue", "Red"],
    startingPrice: 899,
    isPro: false,
    isPlus: true,
    displaySize: "6.7\"",
    features: ["A15 Bionic chip", "Dual camera system", "Ceramic Shield"]
  },
  {
    id: "iphone-14",
    name: "iPhone 14",
    series: "14",
    releaseYear: 2022,
    storageOptions: ["128GB", "256GB", "512GB"],
    colors: ["Midnight", "Purple", "Starlight", "Blue", "Red"],
    startingPrice: 799,
    isPro: false,
    isPlus: false,
    displaySize: "6.1\"",
    features: ["A15 Bionic chip", "Dual camera system", "Ceramic Shield"]
  },
  {
    id: "iphone-13-pro-max",
    name: "iPhone 13 Pro Max",
    series: "13",
    releaseYear: 2021,
    storageOptions: ["128GB", "256GB", "512GB", "1TB"],
    colors: ["Graphite", "Gold", "Silver", "Sierra Blue", "Alpine Green"],
    startingPrice: 1099,
    isPro: true,
    isPlus: false,
    displaySize: "6.7\"",
    features: ["A15 Bionic chip", "Triple camera system", "ProMotion", "Ceramic Shield"]
  },
  {
    id: "iphone-13-pro",
    name: "iPhone 13 Pro",
    series: "13",
    releaseYear: 2021,
    storageOptions: ["128GB", "256GB", "512GB", "1TB"],
    colors: ["Graphite", "Gold", "Silver", "Sierra Blue", "Alpine Green"],
    startingPrice: 999,
    isPro: true,
    isPlus: false,
    displaySize: "6.1\"",
    features: ["A15 Bionic chip", "Triple camera system", "ProMotion", "Ceramic Shield"]
  },
  {
    id: "iphone-13",
    name: "iPhone 13",
    series: "13",
    releaseYear: 2021,
    storageOptions: ["128GB", "256GB", "512GB"],
    colors: ["Pink", "Blue", "Midnight", "Starlight", "Red", "Green"],
    startingPrice: 799,
    isPro: false,
    isPlus: false,
    displaySize: "6.1\"",
    features: ["A15 Bionic chip", "Dual camera system", "Ceramic Shield"]
  },
  {
    id: "iphone-13-mini",
    name: "iPhone 13 mini",
    series: "13",
    releaseYear: 2021,
    storageOptions: ["128GB", "256GB", "512GB"],
    colors: ["Pink", "Blue", "Midnight", "Starlight", "Red", "Green"],
    startingPrice: 699,
    isPro: false,
    isPlus: false,
    displaySize: "5.4\"",
    features: ["A15 Bionic chip", "Dual camera system", "Ceramic Shield"]
  },
  {
    id: "iphone-12-pro-max",
    name: "iPhone 12 Pro Max",
    series: "12",
    releaseYear: 2020,
    storageOptions: ["128GB", "256GB", "512GB"],
    colors: ["Graphite", "Silver", "Gold", "Pacific Blue"],
    startingPrice: 1099,
    isPro: true,
    isPlus: false,
    displaySize: "6.7\"",
    features: ["A14 Bionic chip", "Triple camera system", "LiDAR", "Ceramic Shield"]
  },
  {
    id: "iphone-12-pro",
    name: "iPhone 12 Pro",
    series: "12",
    releaseYear: 2020,
    storageOptions: ["128GB", "256GB", "512GB"],
    colors: ["Graphite", "Silver", "Gold", "Pacific Blue"],
    startingPrice: 999,
    isPro: true,
    isPlus: false,
    displaySize: "6.1\"",
    features: ["A14 Bionic chip", "Triple camera system", "LiDAR", "Ceramic Shield"]
  },
  {
    id: "iphone-12",
    name: "iPhone 12",
    series: "12",
    releaseYear: 2020,
    storageOptions: ["64GB", "128GB", "256GB"],
    colors: ["Black", "White", "Red", "Green", "Blue", "Purple"],
    startingPrice: 799,
    isPro: false,
    isPlus: false,
    displaySize: "6.1\"",
    features: ["A14 Bionic chip", "Dual camera system", "Ceramic Shield"]
  },
  {
    id: "iphone-12-mini",
    name: "iPhone 12 mini",
    series: "12",
    releaseYear: 2020,
    storageOptions: ["64GB", "128GB", "256GB"],
    colors: ["Black", "White", "Red", "Green", "Blue", "Purple"],
    startingPrice: 699,
    isPro: false,
    isPlus: false,
    displaySize: "5.4\"",
    features: ["A14 Bionic chip", "Dual camera system", "Ceramic Shield"]
  },
  {
    id: "iphone-11-pro-max",
    name: "iPhone 11 Pro Max",
    series: "11",
    releaseYear: 2019,
    storageOptions: ["64GB", "256GB", "512GB"],
    colors: ["Space Gray", "Silver", "Gold", "Midnight Green"],
    startingPrice: 1099,
    isPro: true,
    isPlus: false,
    displaySize: "6.5\"",
    features: ["A13 Bionic chip", "Triple camera system", "Super Retina XDR"]
  },
  {
    id: "iphone-11-pro",
    name: "iPhone 11 Pro",
    series: "11",
    releaseYear: 2019,
    storageOptions: ["64GB", "256GB", "512GB"],
    colors: ["Space Gray", "Silver", "Gold", "Midnight Green"],
    startingPrice: 999,
    isPro: true,
    isPlus: false,
    displaySize: "5.8\"",
    features: ["A13 Bionic chip", "Triple camera system", "Super Retina XDR"]
  },
  {
    id: "iphone-11",
    name: "iPhone 11",
    series: "11",
    releaseYear: 2019,
    storageOptions: ["64GB", "128GB", "256GB"],
    colors: ["Black", "White", "Red", "Yellow", "Green", "Purple"],
    startingPrice: 699,
    isPro: false,
    isPlus: false,
    displaySize: "6.1\"",
    features: ["A13 Bionic chip", "Dual camera system", "Liquid Retina display"]
  }
];

export function getModelsByYear(year: number): iPhoneModel[] {
  return IPHONE_CATALOG.filter(model => model.releaseYear === year);
}

export function getModelsBySeries(series: string): iPhoneModel[] {
  return IPHONE_CATALOG.filter(model => model.series === series);
}

export function getProModels(): iPhoneModel[] {
  return IPHONE_CATALOG.filter(model => model.isPro);
}

export function getLatestModels(): iPhoneModel[] {
  return IPHONE_CATALOG.filter(model => model.series === "17");
}

export function getModelById(id: string): iPhoneModel | undefined {
  return IPHONE_CATALOG.find(model => model.id === id);
}
