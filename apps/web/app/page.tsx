'use client';

import Image from "next/image";
import { Card } from "@repo/ui/card";
import { Gradient } from "@repo/ui/gradient";
import { TurborepoLogo } from "@repo/ui/turborepo-logo";
import LandingPage from "../components/landingpage";
import ProductsPage from "../components/products/page";
import HowItWorksHomePage from "../components/howitworks-hm";
import GetStartedWithUploads from "../components/getstartedwithuploads";
import ReviewsPage from "../components/reviews";
import FetaturedInPage from "../components/featuredin/page";
import AboutUsPage from "../components/aboutus/page";
import GetMyBoxHomePage from "../components/getmybox-hm";
import FooterPage from "../components/footer";

// const LINKS = [
//   {
//     title: "Docs",
//     href: "https://turborepo.com/docs",
//     description: "Find in-depth information about Turborepo features and API.",
//   },
//   {
//     title: "Learn",
//     href: "https://turborepo.com/docs/handbook",
//     description: "Learn more about monorepos with our handbook.",
//   },
//   {
//     title: "Templates",
//     href: "https://turborepo.com/docs/getting-started/from-example",
//     description: "Choose from over 15 examples and deploy with a single click.",
//   },
//   {
//     title: "Deploy",
//     href: "https://vercel.com/new",
//     description:
//       "Instantly deploy your Turborepo to a shareable URL with Vercel.",
//   },
// ];

export default function Page() {
  return (
    <div>
      <LandingPage />
      <ProductsPage />
      <HowItWorksHomePage />
      <GetStartedWithUploads />
      <ReviewsPage />
      <FetaturedInPage />
      <AboutUsPage />
      <GetMyBoxHomePage />
      <FooterPage />
    </div>
  );
}
