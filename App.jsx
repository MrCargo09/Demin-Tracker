import { useState, useEffect } from "react";

const WASH_THRESHOLD = 30;

export default function DenimTracker() {
  const [pairs, setPairs] = useState([]);
  const [newPair, setNewPair] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("denimPairs");
    if (saved) setPairs(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("denimPairs", JSON.stringify(pairs));
  }, [pairs]);

  const addPair = () => {
    if (!newPair.trim()) return;
    if (pairs.some((p) => p.name === newPair.trim())) return;
    setPairs([...pairs, { name: newPair.trim(), wears: 0 }]);
    setNewPair("");
  };

  const wearPair = (index) => {
    const updated = [...pairs];
    updated[index].wears += 1;
    setPairs(updated);
  };

  const washPair = (index) => {
    const updated = [...pairs];
    updated[index].wears = 0;
    setPairs(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-indigo-700 p-4 text-white">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Selvedge Denim Tracker 👖
      </h1>

      <div className="flex gap-2 mb-6">
        <input
          className="flex-1 rounded p-2 text-black"
          placeholder="Add new jeans (e.g. Iron Heart 888)"
          value={newPair}
          onChange={(e) => setNewPair(e.target.value)}
        />
        <button
          onClick={addPair}
          className="bg-red-600 hover:bg-red-700 rounded px-4 py-2"
        >
          Add
        </button>
      </div>

      <div className="grid gap-4">
        {pairs.map((pair, i) => (
          <div
            key={i}
            className="bg-indigo-800 rounded-xl shadow-md p-4 border-l-4 border-red-500"
          >
            <h2 className="text-lg font-semibold">{pair.name}</h2>
            <p className="mb-2">Worn: {pair.wears} times</p>

            {pair.wears >= WASH_THRESHOLD && (
              <p className="text-red-300 font-bold mb-2">⚠️ Time to wash!</p>
            )}

            <div className="flex gap-2">
              <button
                className="bg-green-600 hover:bg-green-700 rounded px-3 py-1"
                onClick={() => wearPair(i)}
              >
                Wear
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-black rounded px-3 py-1"
                onClick={() => washPair(i)}
              >
                Wash
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
