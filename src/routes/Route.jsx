import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "../components/Landingpage/Landing";
import EVPage from "../components/EV/Evpage ";
import SolarInstallation from "../components/Solar/SolarInstallation";
import ContactPage from "../components/Contact/ContactUs";
import SolarEstimator from "../components/Solar/SolarEstimator";
import ComingSoon from "../components/ComingSoon/ComingSoon";

export default function WattenRoute() {
    return (
        <>
            <Routes>
                <Route path="/watten-power" element={<Landing/>} />
                <Route path="/ev-charger" element={<EVPage/>}/>
                <Route path="/solar" element={<SolarInstallation/>}/>
                <Route path="/contact-us" element={<ContactPage/>}/>
                <Route path="/solar-estimator" element={<SolarEstimator/>}/>
                
                <Route path="/" element={<ComingSoon/>}/>

                {/* 🔥 Redirect everything else to "/" */}
                {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
            </Routes>
        </>
    )
}