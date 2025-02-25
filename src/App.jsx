import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  // Load data from localStorage or use default state
  const [devices, setDevices] = useState(() => {
    const savedDevices = localStorage.getItem("devices");
    return savedDevices ? JSON.parse(savedDevices) : [{ name: "Laptop", count: 0 }];
  });

  const [newDevice, setNewDevice] = useState("");
  const [confirmRemove, setConfirmRemove] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);

  // Save devices to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("devices", JSON.stringify(devices));
  }, [devices]);

  const addDevice = () => {
    if (newDevice.trim() !== "") {
      setDevices([...devices, { name: newDevice, count: 0 }]);
      setNewDevice("");
    }
  };

  const updateCount = (index, delta) => {
    const updatedDevices = [...devices];
    updatedDevices[index].count = Math.max(0, updatedDevices[index].count + delta);
    setDevices(updatedDevices);
  };

  const handleRemoveClick = (index) => {
    if (confirmRemove === index) {
      setDevices(devices.filter((_, i) => i !== index));
      setConfirmRemove(null);
    } else {
      setConfirmRemove(index);
      setTimeout(() => setConfirmRemove(null), 3000);
    }
  };

  const submitCounts = () => {
    setSubmittedData(devices);
  };

  return (
    <main>
      <h1>Device Click Counter</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {devices.map((device, index) => (
          <div key={index} className="device-card">
            {/* Remove Button */}
            <button
              onClick={() => handleRemoveClick(index)}
              className={`remove-btn ${confirmRemove === index ? "confirm" : ""}`}
            >
              {confirmRemove === index ? "✓" : "🗑"}
            </button>

            <h2 className="font-semibold text-gray-700 text-lg">{device.name}</h2>
            <p className="text-xl font-bold mt-1">{device.count}</p>
            <div className="flex gap-3 mt-3">
              <button onClick={() => updateCount(index, -1)} className="minus-btn">−</button>
              <button onClick={() => updateCount(index, 1)} className="plus-btn">+</button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Device */}
      <div className="mt-8 bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-3 text-center">Add a New Device</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={newDevice}
            onChange={(e) => setNewDevice(e.target.value)}
            placeholder="Enter device name"
            className="border p-2 w-full rounded-md"
          />
          <button onClick={addDevice} className="add-btn">Add</button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 text-center">
        <button onClick={submitCounts} className="submit-btn">Submit</button>
      </div>

      {/* Display Submitted Data */}
      {submittedData && (
        <div className="submitted-data">
          <h2>Submitted Data:</h2>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </main>
  );
}
