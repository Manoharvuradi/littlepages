import BookSize from "../components/booksize";
import CoverImage from "../components/coverimage";

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
//   {
//     name: "Eidted Images",
//     description: "",
//     href: "#",
//     status: "upcoming",
//     component: EditedImages,
//   },
//   {
//     name: "Payment details",
//     description: "",
//     href: "#",
//     status: "upcoming",
//     component: Payments,
//   },
];