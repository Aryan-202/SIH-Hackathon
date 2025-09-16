import React, { useEffect, useState, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, addDoc, setDoc, updateDoc, deleteDoc, onSnapshot, collection, query, where, getDocs, serverTimestamp, setLogLevel } from 'firebase/firestore';
import { MapPin, BellRing, Users, FileText, X, ChevronRight, AlertCircle, Plus, Search, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [tourists, setTourists] = useState([]);
  const [isAddIncidentModalOpen, setIsAddIncidentModalOpen] = useState(false);
  const [newIncidentData, setNewIncidentData] = useState({
    touristId: '',
    location: '',
    description: '',
  });

  const db = useRef(null);
  const auth = useRef(null);
  const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
  
  useEffect(() => {
    try {
      setLogLevel('debug');
      const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
      const app = initializeApp(firebaseConfig);
      db.current = getFirestore(app);
      auth.current = getAuth(app);

      const unsubscribe = onAuthStateChanged(auth.current, async (user) => {
        if (user) {
          setUserId(user.uid);
          setIsAuthReady(true);
        } else {
          // Sign in anonymously if no auth token is provided
          try {
            if (typeof __initial_auth_token !== 'undefined') {
              await signInWithCustomToken(auth.current, __initial_auth_token);
            } else {
              await signInAnonymously(auth.current);
            }
          } catch (error) {
            console.error("Firebase Auth Error:", error);
          }
        }
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Firebase initialization failed:", error);
    }
  }, []);

  useEffect(() => {
    if (!isAuthReady || !db.current || !userId) return;

    // Listen for real-time updates to alerts
    const alertsCollection = collection(db.current, `artifacts/${appId}/public/data/incidents`);
    const alertsUnsub = onSnapshot(alertsCollection, (snapshot) => {
      const fetchedAlerts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAlerts(fetchedAlerts);
    }, (error) => {
      console.error("Error fetching alerts:", error);
    });

    // Listen for real-time updates to tourists
    const touristsCollection = collection(db.current, `artifacts/${appId}/users/${userId}/tourists`);
    const touristsUnsub = onSnapshot(touristsCollection, (snapshot) => {
      const fetchedTourists = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTourists(fetchedTourists);
    }, (error) => {
      console.error("Error fetching tourists:", error);
    });
    
    // Cleanup listeners on unmount
    return () => {
      alertsUnsub();
      touristsUnsub();
    };
  }, [isAuthReady, userId]);

  const handleAddIncident = async () => {
    try {
      if (!newIncidentData.touristId || !newIncidentData.location) {
        console.error("Tourist ID and Location are required.");
        return;
      }
      const incidentsCollectionRef = collection(db.current, `artifacts/${appId}/public/data/incidents`);
      await addDoc(incidentsCollectionRef, {
        ...newIncidentData,
        timestamp: serverTimestamp(),
        status: 'Unresolved'
      });
      setNewIncidentData({ touristId: '', location: '', description: '' });
      setIsAddIncidentModalOpen(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 font-inter text-gray-100 flex flex-col p-4 md:p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-700">
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-400">Admin Dashboard</h1>
          <p className="text-sm md:text-base text-gray-400">Logged in as: <span className="font-mono text-gray-300 break-all">{userId || 'Loading...'}</span></p>
        </div>
        <button
          onClick={() => { console.log("Logout functionality not implemented in this demo."); }}
          className="bg-gray-800 text-gray-300 font-bold py-2 px-4 rounded-full shadow-lg hover:bg-gray-700 transition transform hover:scale-105 flex items-center space-x-2"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </header>

      <main className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Real-time Alerts & Map - Now in a single column */}
        <div className="lg:col-span-1 grid grid-rows-2 gap-8">
          {/* Real-time Alerts */}
          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg transition-transform hover:scale-[1.01] duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-100 flex items-center space-x-2">
                <BellRing size={24} className="text-red-500 animate-pulse" />
                <span>Real-time Alerts ({alerts.length})</span>
              </h2>
              <button
                onClick={() => setIsAddIncidentModalOpen(true)}
                className="bg-red-600 text-white p-2 rounded-full shadow-md hover:bg-red-700 transition"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="h-40 overflow-y-auto custom-scrollbar">
              {alerts.length === 0 ? (
                <p className="text-center text-gray-400 mt-10">No active alerts.</p>
              ) : (
                alerts.map(alert => (
                  <div key={alert.id} className="bg-gray-700 p-4 rounded-xl shadow-inner mb-4 flex justify-between items-center transition-transform transform hover:scale-[1.02]">
                    <div>
                      <p className="font-semibold text-gray-50 flex items-center space-x-2">
                        <AlertCircle size={20} className="text-red-400" />
                        <span>Tourist ID: {alert.touristId}</span>
                      </p>
                      <p className="text-sm text-gray-300 mt-1">Location: {alert.location}</p>
                      <p className="text-sm text-gray-400 mt-1">{alert.description}</p>
                      <p className="text-xs text-gray-500 mt-1">Status: {alert.status}</p>
                    </div>
                    <button className="text-blue-400 hover:text-blue-300">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
          {/* Mock Map */}
          <div className="relative p-6 bg-gray-800 rounded-2xl shadow-lg transition-transform hover:scale-[1.01] duration-300">
            <h2 className="text-2xl font-bold text-gray-100 flex items-center space-x-2 mb-4">
              <MapPin size={24} className="text-blue-500" />
              <span>Live Map</span>
            </h2>
            <div className="w-full h-56 bg-gray-700 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(https://placehold.co/600x400/1F2937/9CA3AF/png?text=Mock+Map+View)' }}></div>
              <p className="absolute text-white text-center text-sm p-2 bg-black bg-opacity-50 rounded">Live locations would be displayed here.</p>
            </div>
          </div>
        </div>
        
        {/* Registered Tourists - Now in a wider, two-column space */}
        <div className="lg:col-span-2 p-6 bg-gray-800 rounded-2xl shadow-lg transition-transform hover:scale-[1.01] duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-100 flex items-center space-x-2">
              <Users size={24} className="text-green-500" />
              <span>Registered Tourists ({tourists.length})</span>
            </h2>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search tourists..."
              className="w-full bg-gray-700 text-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="h-96 overflow-y-auto custom-scrollbar">
            {tourists.length === 0 ? (
              <p className="text-center text-gray-400 mt-20">No tourists registered yet.</p>
            ) : (
              tourists.map(tourist => (
                <div key={tourist.id} className="bg-gray-700 p-3 rounded-xl shadow-inner mb-2 flex justify-between items-center transition-transform transform hover:scale-[1.02]">
                  <p className="font-semibold text-gray-50 truncate">{tourist.id}</p>
                  <button className="text-blue-400 hover:text-blue-300">
                    <ChevronRight size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Incident Reporting Section */}
      <section className="p-6 bg-gray-800 rounded-2xl shadow-lg transition-transform hover:scale-[1.01] duration-300">
        <h2 className="text-2xl font-bold text-gray-100 flex items-center space-x-2 mb-4">
          <FileText size={24} className="text-purple-500" />
          <span>Incident Reporting</span>
        </h2>
        <p className="text-gray-400 mb-4">
          Use this section to view and manage detailed reports for all incidents, including e-FIR generation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl shadow hover:bg-gray-600 transition-transform transform hover:scale-[1.02]">
            View All Reports
          </button>
          <button className="bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl shadow hover:bg-gray-600 transition-transform transform hover:scale-[1.02]">
            Generate e-FIR
          </button>
        </div>
      </section>

      {/* Add Incident Modal */}
      {isAddIncidentModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-lg transition-all transform scale-100">
            <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
              <h3 className="text-xl font-bold text-white">Add New Incident</h3>
              <button onClick={() => setIsAddIncidentModalOpen(false)} className="text-gray-400 hover:text-gray-200">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Tourist ID</label>
                <input
                  type="text"
                  value={newIncidentData.touristId}
                  onChange={(e) => setNewIncidentData({ ...newIncidentData, touristId: e.target.value })}
                  className="w-full p-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Tourist ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                <input
                  type="text"
                  value={newIncidentData.location}
                  onChange={(e) => setNewIncidentData({ ...newIncidentData, location: e.target.value })}
                  className="w-full p-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  value={newIncidentData.description}
                  onChange={(e) => setNewIncidentData({ ...newIncidentData, description: e.target.value })}
                  className="w-full p-2 bg-gray-700 rounded-lg text-white h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the incident"
                ></textarea>
              </div>
              <button
                onClick={handleAddIncident}
                className="w-full bg-red-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-red-700 transition"
              >
                Submit Incident
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tailwind CSS utility classes and animations */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          background-color: #111827;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #6B7280;
          border-radius: 10px;
          border: 2px solid #374151;
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .animate-delay-200 { animation-delay: 0.2s; }
        .animate-delay-300 { animation-delay: 0.3s; }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
