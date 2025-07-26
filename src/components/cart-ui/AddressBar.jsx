import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAddressFromStorage, formatAddressForDisplay, getAddressTypeDisplay } from "../../utils/addressUtils";

const AddressBar = () => {
  const [savedAddress, setSavedAddress] = useState(null);

  useEffect(() => {
    const address = getAddressFromStorage();
    setSavedAddress(address);
    
    // Listen for address updates
    const handleAddressUpdate = () => {
      const updatedAddress = getAddressFromStorage();
      setSavedAddress(updatedAddress);
    };
    
    window.addEventListener('addressUpdated', handleAddressUpdate);
    return () => window.removeEventListener('addressUpdated', handleAddressUpdate);
  }, []);

  const formattedAddress = savedAddress ? formatAddressForDisplay(savedAddress) : null;
  const addressType = savedAddress ? getAddressTypeDisplay(savedAddress.addressType) : null;

  return (
    <div className="flex justify-between items-center border-t-2 border-gray-100 text-sm shadow-sm py-2 bg-white px-4">
      <div className="py-2 w-[70%]">
        <div className="mb-1">
          Deliver To:{""}
          <span className="font-semibold ml-2">
            {savedAddress ? `${savedAddress.fullName}, ${savedAddress.pincode}` : 'India'}
          </span>

          {addressType && (
            <span className="ml-2 mt-1 bg-gray-100 px-1 py-0.5 font-medium rounded text-gray-500 text-sm">
              {addressType}
            </span>
          )}
        </div>
        <div className="mt-0.5 text-sm text-gray-500 truncate">
          {formattedAddress || 'No Address Saved'}
        </div>
      </div>
      <div>
        <Link 
          to={`/address?from=${window.location.pathname}`}
          className="px-5 py-2 text-blue-600 font-semibold text-xs bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
        >
          {savedAddress ? 'Change' : 'Add'}
        </Link>
      </div>
    </div>
  );
};

export default AddressBar;
