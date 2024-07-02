import Footer from "@/components/ui/Footer";
import HowItWorks from "@/components/ui/HowItWorks";
import Landing from "@/components/ui/Landing";
import Navbar from "@/components/ui/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Landing/>
      <HowItWorks/>
      <Footer/>
    </div>
  );
}
