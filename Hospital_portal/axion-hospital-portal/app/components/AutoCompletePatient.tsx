"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { UserCircle, X, Search } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  dateOfBirth?: string;
  gender?: string;
  nationalId?: string;
}

interface AutocompletePatientProps {
  patients: Patient[];
  selectedPatient: Patient | null;
  onSelect: (patient: Patient | null) => void;
}

export const AutocompletePatient = ({ patients, selectedPatient, onSelect }: AutocompletePatientProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedPatient) {
      setSearchTerm(selectedPatient.name);
    }
  }, [selectedPatient]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPatients([]);
      return;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        (patient.nationalId && patient.nationalId.includes(searchTerm))
    );

    setFilteredPatients(filtered);
  }, [searchTerm, patients]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);

      if (selectedPatient && value !== selectedPatient.name) {
        onSelect(null);
      }

      setIsOpen(value.trim() !== "");
    },
    [selectedPatient, onSelect]
  );

  const handleSelectPatient = useCallback(
    (patient: Patient) => {
      onSelect(patient);
      setIsOpen(false);
    },
    [onSelect]
  );

  const handleClear = useCallback(() => {
    setSearchTerm("");
    onSelect(null);
    setIsOpen(false);
    inputRef.current?.focus();
  }, [onSelect]);

  return (
    <div className="relative">
      <div className="relative flex items-center border border-gray-300 rounded-md p-2">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => searchTerm.trim() !== "" && setIsOpen(true)}
          placeholder="Search by name or ID"
          className="flex-1 p-2 outline-none"
        />
        {searchTerm && (
          <button
            type="button"
            className="ml-2 text-gray-500 hover:text-gray-700"
            onClick={handleClear}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Clear</span>
          </button>
        )}
        <button
          type="button"
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Search <Search className="ml-2 h-4 w-4 inline-block" />
        </button>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                onClick={() => handleSelectPatient(patient)}
              >
                <UserCircle className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="font-medium">{patient.name}</div>
                  {patient.nationalId && (
                    <div className="text-xs text-gray-500">
                      ID: {patient.nationalId}
                      {patient.dateOfBirth && ` | DOB: ${patient.dateOfBirth}`}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-2 text-sm text-gray-500">
              No patients found
              <button
                type="button"
                className="mt-1 w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
                onClick={() => handleSelectPatient({ id: "new", name: searchTerm })}
              >
                Create new patient "{searchTerm}"
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
