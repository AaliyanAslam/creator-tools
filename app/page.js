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
        {/* <Navbar />
        <Hero />
        <Reviews/>
        <OurProducts />
        <LearnNEarn />
        <CTA />
        <Footer /> */}
      </div>

      <div
        className={`${urbanist.className} min-h-screen flex items-center justify-center bg-black`}
      >
        <div className="text-center px-4">
          <h1 className="text-white text-4xl sm:text-4xl md:text-6xl font-semibold">
            Payment Pending
          </h1>
          <p className="text-gray-400 mt-2 text-lg sm:text-xl">
            Rs. 20,000 remaining
          </p>
        </div>
      </div>
    </>
  );
}
