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