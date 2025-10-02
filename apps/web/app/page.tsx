'use client';

import LandingPage from "../components/landingpage";
import ProductsPage from "../components/products/page";
import HowItWorksHomePage from "../components/howitworks-hm";
import GetStartedWithUploads from "../components/getstartedwithuploads";
import ReviewsPage from "../components/reviews";
import FetaturedInPage from "../components/featuredin/page";
import AboutUsPage from "../components/aboutus/page";
import GetMyBoxHomePage from "../components/getmybox-hm";
import FooterPage from "../components/footer";


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
