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
    title: "library.items.0.title",
    description: "library.items.0.description",
    type: "article",
    image: PlaceHolderImages.find((img) => img.id === "crop-cycles"),
  },
  {
    id: "2",
    title: "library.items.1.title",
    description: "library.items.1.description",
    type: "guide",
    image: PlaceHolderImages.find((img) => img.id === "soil-health"),
  },
  {
    id: "3",
    title: "library.items.2.title",
    description: "library.items.2.description",
    type: "guide",
    image: PlaceHolderImages.find((img) => img.id === "pesticide-guide"),
  },
  {
    id: "4",
    title: "library.items.3.title",
    description: "library.items.3.description",
    type: "video",
    image: PlaceHolderImages.find((img) => img.id === "irrigation-techniques"),
  },
  {
    id: "5",
    title: "library.items.4.title",
    description: "library.items.4.description",
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
      content: "history.items.0.query.content",
      image: PlaceHolderImages.find((img) => img.id === "history-plant"),
    },
    response: "history.items.0.response",
    date: "history.items.0.date",
  },
  {
    id: "hist2",
    query: {
      type: "text",
      content: "history.items.1.query.content",
    },
    response: "history.items.1.response",
    date: "history.items.1.date",
  },
  {
    id: "hist3",
    query: {
      type: "text",
      content: "history.items.2.query.content",
    },
    response: "history.items.2.response",
    date: "history.items.2.date",
  },
];
