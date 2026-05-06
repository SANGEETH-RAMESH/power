import Approach from "./Approach";
import CircuitCanvas from "./CircuitCanvas";
import Compliance from "./Compliance";
import CTA from "./CTA";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "../Common/Navbar";
import Services from "./Services";
import Ticker from "./Ticker";
import WhyUs from "./WhyUs";


export default function Landing() {
    return (
        <>
            <CircuitCanvas />
            <Navbar />
            <Hero />
            <Ticker />
            <Services />
            <WhyUs />
            <Approach />
            <Compliance />
            <CTA />
            <Footer />
        </>
    )
}