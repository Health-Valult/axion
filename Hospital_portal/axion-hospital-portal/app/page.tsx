import Settings from "./settings/settings";
import "@/app/globals.css";
import PatientSearch from "./search_patients/page";
import PatientReportUpload from "./upload_file/page";
import { AutocompletePatient } from "./components/AutoCompletePatient"; 
// import Signup from "./components/Register";
// import Login from "./components/Login";

export default function HomePage() {
  return (
    <div>
      {/* <Login /> */}
      {/* <Signup /> */}
      <Settings />
      <PatientSearch />
      <PatientReportUpload />
  
    </div>
  );
}
