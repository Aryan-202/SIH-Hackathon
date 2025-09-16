// src/pages/tourist/TouristDashboard.jsx
import React, { useState, useEffect } from 'react';
import { touristApi, getAuthData, clearAuthData } from '../../api/touristApi';
import { useNavigate } from 'react-router-dom';
import MapSection from "../components/UI/MapSection";

const TouristDashboard = () => {
  const [touristData, setTouristData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [activeTab, setActiveTab] = useState('overview');
  const [locationAddress, setLocationAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTouristProfile();
    getCurrentLocation();
  }, []);

  const fetchTouristProfile = async () => {
    try {
      setLoading(true);
      // Try to get profile from API
      const response = await touristApi.getProfile();
      setTouristData(response.tourist);
    } catch (err) {
      setError(err.message || 'Failed to fetch profile data');
      console.error('Profile fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          
          // Try to get address from coordinates
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            if (data.display_name) {
              setLocationAddress(data.display_name);
            }
          } catch (err) {
            console.error('Geocoding error:', err);
          }
          
          // Send location to backend
          try {
            await touristApi.updateLocation({ 
              coordinates: { latitude, longitude },
              address: locationAddress || `Lat: ${latitude}, Lng: ${longitude}`
            });
          } catch (err) {
            console.error('Location update failed:', err);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  };

  const handlePanicAlert = async () => {
    if (window.confirm('Are you sure you want to trigger an emergency alert? This will notify authorities immediately.')) {
      try {
        const response = await touristApi.triggerPanic();
        alert('Emergency alert has been sent to authorities! Help is on the way.');
      } catch (err) {
        alert(err.message || 'Failed to send emergency alert. Please try again.');
      }
    }
  };

  const handleLogout = () => {
    clearAuthData();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && !touristData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <div className="flex space-x-3">
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex-1"
            >
              Try Again
            </button>
            <button 
              onClick={handleLogout}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded flex-1"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Tourist Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 hidden md:inline">Welcome, {touristData?.fullName || 'Tourist'}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {['overview', 'profile', 'safety', 'history'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Welcome Card */}
            <div className="col-span-full bg-white overflow-hidden shadow rounded-lg">
               
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Welcome to your dashboard, {touristData?.fullName}
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Here you can manage your profile, view your safety status, and access emergency features.</p>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {location.latitude ? (
                      <span>Current Location: {locationAddress || `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`}</span>
                    ) : (
                      <span>Location not available</span>
                    )}
                  </div>
                  <button 
                    onClick={getCurrentLocation}
                    className="mt-2 text-blue-500 text-sm hover:text-blue-700 flex items-center"
                  >
                    <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh Location
                  </button>
                </div>
              </div>
            </div>
            {/* Map Section */}
            <div className="col-span-full bg-white overflow-hidden shadow rounded-lg">
               <MapSection 
                   latitude={location.latitude || 28.6139} 
                   longitude={location.longitude || 77.2090} 
              />
            </div>

            {/* Emergency Button */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Emergency Assistance</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Trigger an emergency alert if you need immediate assistance from authorities.</p>
                </div>
                <div className="mt-5">
                  <button
                    onClick={handlePanicAlert}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-full"
                  >
                    <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Emergency Alert
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Status */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Status</h3>
                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-1">
                  <div className="px-4 py-2 bg-gray-50 shadow rounded-lg overflow-hidden">
                    <dt className="text-sm font-medium text-gray-500 truncate">Digital ID Hash</dt>
                    <dd className="mt-1 text-sm font-mono text-gray-900 truncate">{touristData?.digitalIdHash || 'Not available'}</dd>
                  </div>
                  <div className="px-4 py-2 bg-gray-50 shadow rounded-lg overflow-hidden">
                    <dt className="text-sm font-medium text-gray-500 truncate">Registration Status</dt>
                    <dd className="mt-1 text-lg font-semibold text-green-600">Complete</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
                <div className="mt-5 space-y-3">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Edit Profile
                  </button>
                  <button 
                    onClick={() => setActiveTab('safety')}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Safety Information
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && touristData && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Your profile details and information.</p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Full name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{touristData.fullName || 'Not provided'}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Email address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{touristData.email || 'Not provided'}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{touristData.phoneNumber || 'Not provided'}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Digital ID Hash</dt>
                  <dd className="mt-1 text-sm font-mono text-gray-900 sm:mt-0 sm:col-span-2">{touristData.digitalIdHash || 'Not available'}</dd>
                </div>
                {touristData.emergencyContacts && touristData.emergencyContacts.length > 0 && (
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Emergency Contacts</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                        {touristData.emergencyContacts.map((contact, index) => (
                          <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                            <div className="w-0 flex-1 flex items-center">
                              <span className="ml-2 flex-1 w-0 truncate">
                                {contact.name}: {contact.phone}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        )}

        {activeTab === 'safety' && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Safety Information</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Your safety is our priority. Here are some tips and your current safety status.</p>
                </div>
                <div className="mt-5 border-t border-gray-200 pt-5">
                  <h4 className="text-sm font-medium text-gray-900">Emergency Contacts</h4>
                  <ul className="mt-3 space-y-3">
                    <li className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Local Emergency Services</p>
                        <p className="text-sm text-gray-500">112 (All emergencies)</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="mt-5">
                  <h4 className="text-sm font-medium text-gray-900">Safety Tips</h4>
                  <ul className="mt-3 space-y-2 text-sm text-gray-500">
                    <li className="flex items-start">
                      <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2">Keep your phone charged and with you at all times</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2">Be aware of your surroundings</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2">Keep emergency contacts handy</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Activity History</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Your recent activities and alerts.</p>
            </div>
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <p className="text-sm text-gray-500">No recent activity to display.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TouristDashboard;