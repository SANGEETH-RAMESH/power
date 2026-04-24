import { Routes, Route } from "react-router-dom";
import Landing from "../components/Landingpage/Landing";
import EVPage from "../components/EV/Evpage ";
import SolarInstallation from "../components/Solar/SolarInstallation";


export default function WattenRoute() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing/>} />
                <Route path="ev" element={<EVPage/>}/>
                <Route path="solar" element={<SolarInstallation/>}/>
            </Routes>
        </>
    )
}