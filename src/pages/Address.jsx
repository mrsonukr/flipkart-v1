import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import StateSelect from "../components/address-ui/StateSelect";
import ButtonRadioGroup from "../components/address-ui/ButtonRadioGroup";
import Header3 from "../components/Header3";
import { saveAddressToStorage, getAddressFromStorage } from "../utils/addressUtils";
import { useLocation } from "react-router-dom";

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    height: "50px",
    "& input": {
      padding: "12px 14px",
    },
    "& fieldset": {
      borderWidth: "1px",
      borderColor: "#D1D5DB",
    },
    "&:hover fieldset": {
      borderColor: "#D1D5DB",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2874f0",
      borderWidth: "1px",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.9rem",
    color: "#757575",
    top: "-2px",
    backgroundColor: "white",
    padding: "0 4px",
    marginLeft: "6px",
  },
  "& label.Mui-focused": {
    color: "#757575",
    fontSize: "0.95rem",
  },
};

const Address = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const fromPage = searchParams.get('from') || '/cart'; // Default to cart if no 'from' param
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    alternatePhone: '',
    pincode: '',
    state: 'Andhra Pradesh',
    city: '',
    houseNo: '',
    roadName: '',
    addressType: 'home'
  });
  
  const fields = [
    { id: "full-name", label: "Full Name" },
    { id: "mobile-number", label: "Mobile Number" },
    { id: "address1", label: "House No., Building Name" },
    { id: "address2", label: "Road name, Area, Colony" },
  ];

  const [showAlternateInput, setShowAlternateInput] = useState(false);
  const alternateRef = useRef(null);

  // Load existing address on component mount
  useEffect(() => {
    const savedAddress = getAddressFromStorage();
    if (savedAddress) {
      setFormData(savedAddress);
      if (savedAddress.alternatePhone) {
        setShowAlternateInput(true);
      }
    }
  }, []);

  useEffect(() => {
    if (showAlternateInput && alternateRef.current) {
      alternateRef.current.focus();
    }
  }, [showAlternateInput]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBlurAlternate = () => {
    if (formData.alternatePhone.trim() === "") {
      setShowAlternateInput(false);
    }
  };

  const handleAddressTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      addressType: type
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save to localStorage
    const success = saveAddressToStorage(formData);
    
    if (success) {
      // Dispatch event to update AddressBar
      window.dispatchEvent(new Event('addressUpdated'));
      
      // Smart redirect based on source page
      if (fromPage === '/summary') {
        // If coming from summary or buy now, go to summary
        navigate('/summary');
      } else {
        // If coming from cart, go back to cart
        navigate('/cart');
      }
    }
  };

  return (
    <div>
      <Header3 title="Add delivery address" />
      <div className="flex justify-center items-center mt-2 border-b shadow-md border-gray-300 pb-2">
        <img className="mb-2" src="/assets/images/svg/p1.svg" alt="" />
      </div>
      <div className="p-4">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: "100%", maxWidth: "100%" }}
          noValidate
          autoComplete="off"
        >
          {/* Full Name */}
          <TextField
            id={fields[0].id}
            label={fields[0].label}
            variant="outlined"
            fullWidth
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            sx={textFieldStyles}
            margin="normal"
          />

          {/* Mobile Number */}
          <TextField
            id={fields[1].id}
            label={fields[1].label}
            variant="outlined"
            fullWidth
            value={formData.mobileNumber}
            onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
            sx={textFieldStyles}
            margin="normal"
          />

          {/* + Add Alternate Phone */}
          {showAlternateInput ? (
            <TextField
              inputRef={alternateRef}
              value={formData.alternatePhone}
              onChange={(e) => handleInputChange('alternatePhone', e.target.value)}
              onBlur={handleBlurAlternate}
              label="+ Add Alternate Phone Number"
              variant="outlined"
              fullWidth
              sx={textFieldStyles}
              margin="normal"
            />
          ) : (
            <div onClick={() => setShowAlternateInput(true)}>
              <p className="text-blue-600 text-sm mt-1 cursor-pointer">
                + Add Alternate Phone Number
              </p>
            </div>
          )}

          {/* Pincode + Use My Location */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TextField
              id="pincode"
              label="Pincode"
              variant="outlined"
              value={formData.pincode}
              onChange={(e) => handleInputChange('pincode', e.target.value)}
              sx={{ ...textFieldStyles, width: "50%" }}
              margin="normal"
            />
            <div
              className="bg-[#2874f0] gap-2 flex items-center mt-2 justify-center text-white text-sm p-3 rounded-md cursor-pointer whitespace-nowrap"
              style={{ width: "50%", height: "37px" }}
            >
              <img src="/assets/images/svg/location.svg" alt="" />
              <span>Use my location</span>
            </div>
          </Box>

          {/* State and City */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
            <Box sx={{ width: "50%" }}>
              <StateSelect 
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                sx={textFieldStyles} 
              />
            </Box>
            <TextField
              id="city"
              label="City"
              variant="outlined"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              sx={{ ...textFieldStyles, width: "50%", mb: 2 }}
              margin="normal"
            />
          </Box>

          {/* Address Lines */}
          {fields.slice(2).map(({ id, label }, index) => {
            const fieldName = index === 0 ? 'houseNo' : 'roadName';
            return (
            <TextField
              key={id}
              id={id}
              label={label}
              variant="outlined"
              fullWidth
              value={formData[fieldName]}
              onChange={(e) => handleInputChange(fieldName, e.target.value)}
              sx={textFieldStyles}
              margin="normal"
            />
          )})}
        </Box>

        {/* Address Type */}
        <p className="text-[13px] mt-2 text-gray-500">Type of address</p>
        <ButtonRadioGroup 
          selected={formData.addressType}
          onSelectionChange={handleAddressTypeChange}
        />

        {/* Submit */}
        <button 
          type="submit"
          onClick={handleSubmit}
          className="bg-[#fb641b] w-full h-12 rounded-sm text-white mt-4 hover:bg-[#e55a17] transition-colors"
        >
          Save Address
        </button>
      </div>
    </div>
  );
};

export default React.memo(Address);
