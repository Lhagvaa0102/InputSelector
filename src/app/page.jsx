"use client";
import { useState, useEffect } from "react";
import { X, ChevronDown, ChevronUp, Search } from "lucide-react";

const countries = [
  "Mongolia",
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Australia",
  "Austria",
  "Bangladesh",
  "Belgium",
  "Brazil",
  "Canada",
  "China",
  "Denmark",
  "Egypt",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "India",
  "Indonesia",
  "Italy",
  "Japan",
].sort();

const InputSelector = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("selectedCountries");
    if (saved) {
      setSelectedItems(JSON.parse(saved));
    }
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [availableItems, setAvailableItems] = useState(countries);

  useEffect(() => {
    localStorage.setItem("selectedCountries", JSON.stringify(selectedItems));
    updateAvailableItems();
  }, [selectedItems]);

  useEffect(() => {
    updateAvailableItems();
  }, [searchTerm]);

  const updateAvailableItems = () => {
    const filtered = countries.filter(
      (country) =>
        !selectedItems.includes(country) &&
        country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setAvailableItems(filtered);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleSelect = (item) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
      setSearchTerm("");
      setIsOpen(false);
    }
  };

  const handleRemove = (itemToRemove) => {
    setSelectedItems(selectedItems.filter((item) => item !== itemToRemove));
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="relative">
        <div className="mb-2 flex flex-wrap gap-2">
          {selectedItems.map((item) => (
            <span
              key={item}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
            >
              {item}
              <button
                onClick={() => handleRemove(item)}
                className="hover:text-blue-600"
                aria-label={`Remove ${item}`}
              >
                <X size={16} />
              </button>
            </span>
          ))}
        </div>

        <div className="relative">
          <div className="relative">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={handleInputFocus}
              className="w-full pl-9 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="absolute right-2 top-2 text-gray-400"
              aria-label="Toggle dropdown"
            >
              {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>

          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
              <div className="max-h-60 overflow-y-auto">
                {availableItems.length > 0 ? (
                  availableItems.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSelect(item)}
                      className="w-full px-4 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
                    >
                      {item}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500 text-center">
                    Илэрц олдсонгүй
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputSelector;
