import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import LogoStrip from "@/components/sections/LogoStrip";
import HowItWorks from "@/components/sections/HowItWorks";
import Templates from "@/components/sections/Templates";
import LiveAgents from "@/components/sections/LiveAgents";
import Channels from "@/components/sections/Channels";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
return (
<main className="bg-white text-zinc-900 antialiased">
<Navbar />
<Hero />
<LogoStrip />
<HowItWorks />
<Templates />
<LiveAgents />
<Channels />
<Testimonials />
<CTA />
<Footer />
</main>
);
}
