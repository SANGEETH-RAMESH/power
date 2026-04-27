import { Routes, Route } from "react-router-dom";
import Landing from "../components/Landingpage/Landing";
import EVPage from "../components/EV/Evpage ";
import SolarInstallation from "../components/Solar/SolarInstallation";
import ContactPage from "../components/Contact/ContactUs";
// import SolarEstimator from "../components/Solar/SolarEstimator";


export default function WattenRoute() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing/>} />
                <Route path="ev-charger" element={<EVPage/>}/>
                <Route path="solar" element={<SolarInstallation/>}/>
                <Route path="contact-us" element={<ContactPage/>}/>
                {/* <Route path="solar-estimator" element={<SolarEstimator/>}/> */}
            </Routes>
        </>
    )
}