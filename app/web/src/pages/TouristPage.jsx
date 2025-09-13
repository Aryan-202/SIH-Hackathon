import React, { useState } from "react";
import QRCode from "qrcode.react";

const TouristPage = () => {
  const [tourist, setTourist] = useState({
    name: "",
    age: "",
    gender: "",
    nationality: "",
    passport: "",
    email: "",
    phone: "",
    emergency: "",
  });

  const [savedTourists, setSavedTourists] = useState([]);
  const [qrData, setQrData] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTourist({ ...tourist, [name]: value });
  };

  const generateQR = () => {
    const data = JSON.stringify(tourist, null, 2);
    setQrData(data);
  };

  const saveTourist = () => {
    setSavedTourists([...savedTourists, tourist]);

    setTourist({
      name: "",
      age: "",
      gender: "",
      nationality: "",
      passport: "",
      email: "",
      phone: "",
      emergency: "",
    });

    setQrData("");
  };

  return (
    <div className="dashboard">
      <div className="form-container">
        <h1 className="title">Tourist Profile 🧳</h1>

        {/* Profile Picture */}
        <div className="profile-pic">
          <img
            src="https://via.placeholder.com/120"
            alt="Profile"
            className="pic"
          />
          <p className="hint">Upload Profile Picture (optional)</p>
        </div>

        {/* Form */}
        <div className="form-grid">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={tourist.name}
            onChange={handleChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={tourist.age}
            onChange={handleChange}
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={tourist.gender}
            onChange={handleChange}
          />
          <input
            type="text"
            name="nationality"
            placeholder="Nationality"
            value={tourist.nationality}
            onChange={handleChange}
          />
          <input
            type="text"
            name="passport"
            placeholder="Passport No. (Last 4 digits)"
            value={tourist.passport}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={tourist.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={tourist.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="emergency"
            placeholder="Emergency Contact"
            value={tourist.emergency}
            onChange={handleChange}
          />
        </div>

        {/* QR Code + Save Buttons */}
        <div className="actions">
          <button onClick={generateQR} className="btn primary">
            Generate QR Code
          </button>
          <button onClick={saveTourist} className="btn success">
            Save Tourist
          </button>
        </div>

        {qrData && (
          <div className="qr-box">
            <QRCode value={qrData} size={150} />
            <p className="hint">Scan to view profile data</p>
          </div>
        )}
      </div>

      {/* Saved Tourists */}
      {savedTourists.length > 0 && (
        <div className="saved-container">
          <h2 className="subtitle">Saved Tourists 📝</h2>
          <ul>
            {savedTourists.map((t, index) => (
              <li key={index} className="tourist-card">
                <p><strong>Name:</strong> {t.name}</p>
                <p><strong>Age:</strong> {t.age}</p>
                <p><strong>Gender:</strong> {t.gender}</p>
                <p><strong>Nationality:</strong> {t.nationality}</p>
                <p><strong>Email:</strong> {t.email}</p>
                <p><strong>Phone:</strong> {t.phone}</p>
                <p><strong>Emergency:</strong> {t.emergency}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Inline CSS */}
      <style>{`
        .dashboard {
          min-height: 100vh;
          background: linear-gradient(135deg, #1a365d 0%, #2a4365 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .form-container {
          background: #fff;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.2);
          width: 100%;
          max-width: 800px;
          margin-bottom: 2rem;
        }

        .title {
          text-align: center;
          font-size: 1.8rem;
          font-weight: 700;
          color: #2a4365;
          margin-bottom: 1.5rem;
        }

        .profile-pic {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .pic {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 4px solid #3182ce;
          margin-bottom: 0.5rem;
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }

        .hint {
          font-size: 0.9rem;
          color: #718096;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-grid input {
          padding: 0.75rem;
          border: 1px solid #cbd5e0;
          border-radius: 8px;
          font-size: 0.95rem;
          outline: none;
          transition: border 0.3s;
        }

        .form-grid input:focus {
          border-color: #3182ce;
          box-shadow: 0 0 0 2px rgba(49,130,206,0.2);
        }

        .actions {
          margin-top: 1.5rem;
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .btn {
          padding: 0.7rem 1.5rem;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
        }

        .btn.primary {
          background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
        }
        .btn.primary:hover {
          background: linear-gradient(135deg, #3182ce 0%, #2b6cb0 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(66, 153, 225, 0.4);
        }

        .btn.success {
          background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
        }
        .btn.success:hover {
          background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(72, 187, 120, 0.4);
        }

        .qr-box {
          text-align: center;
          margin-top: 1.5rem;
        }

        .saved-container {
          background: #fff;
          padding: 1.5rem;
          border-radius: 14px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.15);
          width: 100%;
          max-width: 900px;
        }

        .subtitle {
          font-size: 1.4rem;
          font-weight: 600;
          color: #2a4365;
          margin-bottom: 1rem;
        }

        .tourist-card {
          background: #f7fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 1rem;
          margin-bottom: 1rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .tourist-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.1);
        }

        .tourist-card p {
          margin: 0.3rem 0;
          font-size: 0.95rem;
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default TouristPage;
