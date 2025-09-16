import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Shield, Lock, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {touristApi, storeAuthData} from '../../api/touristApi'; // Import the API

const TouristRegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    nationality: '',
    emergencyContacts: [{ name: '', phone: '', relationship: 'Family' }],
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear password error when user types
    if ((name === 'password' || name === 'confirmPassword') && passwordError) {
      setPasswordError('');
    }
  };

  const handleEmergencyContactChange = (e, index) => {
    const { name, value } = e.target;
    const newEmergencyContacts = [...formData.emergencyContacts];
    newEmergencyContacts[index][name] = value;
    setFormData({
      ...formData,
      emergencyContacts: newEmergencyContacts
    });
  };

  const addEmergencyContact = () => {
    setFormData({
      ...formData,
      emergencyContacts: [...formData.emergencyContacts, { name: '', phone: '', relationship: 'Family' }]
    });
  };

  const removeEmergencyContact = (index) => {
    if (formData.emergencyContacts.length > 1) {
      const newEmergencyContacts = [...formData.emergencyContacts];
      newEmergencyContacts.splice(index, 1);
      setFormData({
        ...formData,
        emergencyContacts: newEmergencyContacts
      });
    }
  };

  const validateForm = () => {
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    
    // Check password length
    if (formData.password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPasswordError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Prepare data for API (remove confirmPassword as it's not needed in the backend)
      const { confirmPassword, ...apiData } = formData;

      console.log('Sending request to:', '/api/v1/tourists/register');
    console.log('Request data:', apiData);
      
      // Call the API
      const response = await touristApi.register(apiData);
      
      // Store the token and user data
      if (response.token && response.tourist) {
        storeAuthData(response.token, response.tourist);
      }
      
      // Redirect to dashboard or success page
      navigate('/tourist/dashboard', { 
        state: { 
          registrationSuccess: true,
          message: 'Registration successful! Your digital ID is ready.'
        } 
      });
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>

        {/* Registration Form */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="bg-blue-100 p-3 rounded-full inline-flex mb-4">
              <User size={32} className="text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Your Digital Tourist ID
            </h1>
            <p className="text-gray-600">
              Secure your travels with our comprehensive safety system
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone size={20} className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Nationality */}
            <div>
              <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-2">
                Nationality *
              </label>
              <div className="relative">
                <Globe size={20} className="absolute left-3 top-3.5 text-gray-400" />
                <select
                  id="nationality"
                  name="nationality"
                  required
                  value={formData.nationality}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select your nationality</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="JP">Japan</option>
                  {/* Add more countries as needed */}
                </select>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contacts *
              </label>
              {formData.emergencyContacts.map((contact, index) => (
                <div key={index} className="mb-4 p-4 border border-gray-200 rounded-xl">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-gray-700">Contact #{index + 1}</span>
                    {formData.emergencyContacts.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEmergencyContact(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor={`emergencyContactName-${index}`} className="block text-sm text-gray-600 mb-1">
                      Name *
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        id={`emergencyContactName-${index}`}
                        name="name"
                        required
                        value={contact.name}
                        onChange={(e) => handleEmergencyContactChange(e, index)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Contact's full name"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor={`emergencyContactPhone-${index}`} className="block text-sm text-gray-600 mb-1">
                      Phone *
                    </label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="tel"
                        id={`emergencyContactPhone-${index}`}
                        name="phone"
                        required
                        value={contact.phone}
                        onChange={(e) => handleEmergencyContactChange(e, index)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Contact's phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor={`emergencyContactRelationship-${index}`} className="block text-sm text-gray-600 mb-1">
                      Relationship *
                    </label>
                    <select
                      id={`emergencyContactRelationship-${index}`}
                      name="relationship"
                      required
                      value={contact.relationship}
                      onChange={(e) => handleEmergencyContactChange(e, index)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Family">Family</option>
                      <option value="Friend">Friend</option>
                      <option value="Colleague">Colleague</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addEmergencyContact}
                className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add another emergency contact
              </button>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Create a strong password"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  minLength={6}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Confirm your password"
                />
              </div>
              {passwordError && (
                <p className="mt-1 text-sm text-red-600">{passwordError}</p>
              )}
            </div>
            
            {/* Terms and Submit */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-blue-400 transition-colors transform hover:scale-105 duration-200 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <User size={20} />
                  <span>Create Digital ID</span>
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <button 
            onClick={() => navigate('/login')} 
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default TouristRegistrationPage;