import Settings from "./settings/settings";
import "@/app/globals.css";
import PatientSearch from "./search_patients/page";
import UploadFile from "./upload_file/page";

export default function HomePage() {
  return (
    <div>
      <Settings />
      <PatientSearch />
      <UploadFile />
      
    </div>
  );
}
