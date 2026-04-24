import CircuitCanvas from './components/CircuitCanvas'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Approach from './components/Approach'
import Compliance from './components/Compliance'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
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
