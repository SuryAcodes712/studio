import { PlaceHolderImages, type ImagePlaceholder } from "./placeholder-images";

type LibraryItem = {
  id: string;
  title: string;
  description: string;
  type: "article" | "video" | "guide";
  image: ImagePlaceholder | undefined;
};

export const libraryContent: LibraryItem[] = [
  {
    id: "1",
    title: "Understanding Crop Cycles",
    description: "A comprehensive guide to seasonal crop planning and rotation.",
    type: "article",
    image: PlaceHolderImages.find((img) => img.id === "crop-cycles"),
  },
  {
    id: "2",
    title: "Mastering Soil Health",
    description: "Learn how to test and improve your soil for better yields.",
    type: "guide",
    image: PlaceHolderImages.find((img) => img.id === "soil-health"),
  },
  {
    id: "3",
    title: "Beginner's Guide to Pesticides",
    description: "Safe and effective application of pesticides for common pests.",
    type: "guide",
    image: PlaceHolderImages.find((img) => img.id === "pesticide-guide"),
  },
  {
    id: "4",
    title: "Modern Irrigation Techniques",
    description: "Watch and learn about drip irrigation, sprinklers, and more.",
    type: "video",
    image: PlaceHolderImages.find((img) => img.id === "irrigation-techniques"),
  },
  {
    id: "5",
    title: "Weekly Market Trends",
    description: "An analysis of this week's crop prices and market demands.",
    type: "article",
    image: PlaceHolderImages.find((img) => img.id === "market-trends"),
  },
];

type HistoryItem = {
  id: string;
  query: {
    type: "text" | "image";
    content: string;
    image?: ImagePlaceholder | undefined;
  };
  response: string;
  date: string;
};

export const advisoryHistory: HistoryItem[] = [
  {
    id: "hist1",
    query: {
      type: "image",
      content: "Tomato Plant Diagnosis",
      image: PlaceHolderImages.find((img) => img.id === "history-plant"),
    },
    response:
      "The plant appears to be suffering from early blight, characterized by the concentric rings on the lower leaves. It's recommended to apply a copper-based fungicide and ensure proper air circulation.",
    date: "2 days ago",
  },
  {
    id: "hist2",
    query: {
      type: "text",
      content: "How to deal with aphids on my cabbage?",
    },
    response:
      "Aphids on cabbage can be controlled by introducing natural predators like ladybugs, or by spraying with insecticidal soap. Ensure you spray the undersides of the leaves where aphids tend to congregate.",
    date: "1 week ago",
  },
  {
    id: "hist3",
    query: {
      type: "text",
      content: "Best fertilizer for sandy soil?",
    },
    response:
      "For sandy soil, it's best to use a slow-release nitrogen fertilizer. Incorporating organic matter like compost will also help improve water and nutrient retention.",
    date: "3 weeks ago",
  },
];
