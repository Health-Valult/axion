import Settings from "./components/settings";
import PatientSearch from "./search_patients/page";

export default function HomePage() {
  return (
    <div>
      <Settings />
      <PatientSearch />
    </div>
  );
}
