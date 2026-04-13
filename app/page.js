import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import LearnNEarn from "./components/LearnNEarn";
import Navbar from "./components/Navbar";
import OurProducts from "./components/OurProducts";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist" });

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
        <OurProducts />
        <LearnNEarn />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
