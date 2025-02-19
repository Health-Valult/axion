import React, { useState } from 'react'

export default function LanguageDropdown({
  onLanguageSelect,
}: {
  onLanguageSelect: (language: string) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select Language");


  const languages = [
    { label: "සිංහල", value: "si" },
    { label: "தமிழ்", value: "ta" },
    { label: "English", value: "en" },
];

const handleSelect = (lang: string, label: string) => {
    setSelected(label);
    setIsOpen(false);
    onLanguageSelect(lang); // Pass selected language to parent
};

  return (
    <div className="relative inline-block text-left">
      
      <button
        className="inline-flex w-full justify-between items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {languages.map((language) => (
              <button
              key={language.value}
              onClick={() => handleSelect(language.value, language.label)}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              {language.label}
            </button>))}
          </div>
        </div>
      )}
    </div>
  )
}
