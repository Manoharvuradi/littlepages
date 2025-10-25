import BookSize from "../components/booksize";
import BookTitle from "../components/booktitle";
import CoverImage from "../components/coverimage";
import TextDisplay from "../components/textdisplay";

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const createBookSteps = [
  {
    name: "Book Size",
    description: "",
    href: "#",
    status: "current",
    component: BookSize,
  },
  {
    name: "Cover Page",
    description: "",
    href: "#",
    status: "upcoming",
    component: CoverImage,
  },
  {
    name: "Book Title",
    description: "",
    href: "#",
    status: "upcoming",
    component: BookTitle,
  },
  {
    name: "Text Display",
    description: "",
    href: "#",
    status: "upcoming",
    component: TextDisplay,
  },
];

export type PreviewItem = {
  id: string;
  url: string;
  name?: string;
  caption?: string;
  age?: string;
};

export interface IInputProps {
  input: IInput;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formValues: { [key: string]: any };
  index?: number;
  disabled?: boolean;
  tailwindClass?: string;
  value?: string;
  liveCount?: boolean;
}

export interface IInput {
  id?: string;
  label: string;
  name: string;
  type: string;
  value?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  liveCountMax?: number;
}

export const generateAgeOptions = (maxAge: number) => {
  const options = [{ label: "Select", value: "" }];
  for (let i = 1; i <= maxAge; i++) {
    options.push({ label: i.toString(), value: i.toString() });
  }
  return options;
}

export const nameInput = {
  label: "Name",
  type: "text",
  name: "name",
}

export const ageInput = {
  label: "Select Age / Grade",
  type: "text",
  name: "age",
  // options: generateAgeOptions(100),
}

export const captionInput = {
  label: "Caption",
  type: "text",
  name: "caption",
}

export const dateInput = {
  label: "Date",
  type: "date",
  name: "date"
}

export const tagsInput = {
  label: "Tags",
  type: "text",
  name: "tags"
}


interface ImageData {
  id: string;
  url: string;
  displayOptions?: {
    caption?: string | undefined;
    name?: string | undefined;
    age?: string | undefined;
    date?: string;
    tags?: string;
  };
}

interface DisplaySettings {
  showCaption: boolean;
  showName: boolean;
  showDate: boolean;
}

export interface IFormData {
  images: ImageData[];
  userId: number;
  bookSize: string | null;
  coverPhotoUrl: string | null;
  bookTitle: string;
  displaySettings: DisplaySettings;
}

export type Props = {
  formData: IFormData;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
  onNext: () => void;
};

const square = "8in x 8in";
const landscape = "11in x 8.5in";