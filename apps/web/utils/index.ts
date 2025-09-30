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
};

export interface IInputProps {
  input: IInput;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formValues: { [key: string]: any };
  index?: number;
  disabled?: boolean;
  tailwindClass?: string
}

export interface IInput {
  id?: string;
  name: string;
  type: string;
  value: string;
  required: boolean;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

export const generateAgeOptions = (maxAge: number) => {
  const options = [{ label: "Select", value: "" }];
  for (let i = 1; i <= maxAge; i++) {
    options.push({ label: i.toString(), value: i.toString() });
  }
  return options;
}

export const imageInputs = [
  {
    label: "Name",
    type: "text",
    name: "name",
  },
  {
    label: "Age",
    type: "select",
    name: "age",
    options: generateAgeOptions(100),
  },
  {
    label: "Caption",
    type: "text",
    name: "caption",
  },
  {
    label: "Date",
    type: "date",
    name: "date"
  },
  {
    label: "Tags",
    type: "text",
    name: "tags"
  }
]