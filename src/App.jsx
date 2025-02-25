import { useState } from "react";
import "./App.css";

export default function App() {
  const [devices, setDevices] = useState([{ name: "Laptop", count: 0 }]);
  const [newDevice, setNewDevice] = useState("");

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

  const removeDevice = (index) => {
    const updatedDevices = devices.filter((_, i) => i !== index);
    setDevices(updatedDevices);
  };

  const submitData = () => {
    alert(`Summary:\n${JSON.stringify(devices, null, 2)}`);
  };

  return (
    <main className="p-6 max-w-2xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Device Click Counter
      </h1>

      {/* Device List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {devices.map((device, index) => (
          <div key={index} className="relative p-6 bg-white shadow-md rounded-lg flex flex-col items-center">
            {/* Remove Button - Positioned on the Left */}
            <button
              onClick={() => removeDevice(index)}
              className="absolute left-2 top-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
            >
              ❌
            </button>

            {/* Device Name & Count */}
            <h2 className="font-semibold text-gray-700 text-lg mt-6">{device.name}</h2>
            <p className="text-xl font-bold mt-1">{device.count}</p>

            {/* Increment & Decrement Buttons */}
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => updateCount(index, -1)}
                className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition"
              >
                −
              </button>
              <button
                onClick={() => updateCount(index, 1)}
                className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 transition"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Device */}
      <div className="mt-8 bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-3 text-center">
          Add a New Device
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={newDevice}
            onChange={(e) => setNewDevice(e.target.value)}
            placeholder="Enter device name"
            className="border p-2 w-full rounded-md"
          />
          <button
            onClick={addDevice}
            className="bg-blue-500 text-white px-5 py-2 rounded-md shadow hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={submitData}
        className="mt-6 w-full bg-purple-500 text-white px-5 py-2 rounded-md shadow hover:bg-purple-600 transition"
      >
        Submit Data
      </button>
    </main>
  );
}
