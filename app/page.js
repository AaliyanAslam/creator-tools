import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import LearnNEarn from "./components/LearnNEarn";
import Navbar from "./components/Navbar";
import OurProducts from "./components/OurProducts";
import Reviews from "./components/Reviews";
import { urbanist } from "./fonts";

export const metadata = {
  title: "Creator Tools by Usama - Premium Digital Subscriptions in Pakistan",
  description:
    "Get premium digital subscriptions at Pakistan's lowest prices. Verified accounts, instant delivery. Elevate your online experience with Creator Tools by Usama.",
};

export default function page() {
  return (
    <>
      <div className={`${urbanist.className}`}>
        <Navbar />
        <Hero />
        <Reviews/>
        <OurProducts />
        <LearnNEarn />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
