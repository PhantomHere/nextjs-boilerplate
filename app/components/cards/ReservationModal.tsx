"use client";
import { useState } from "react";
import { Recipe } from "../../page";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Recipe[];
  onSuccess: () => void;
}

export default function ReservationModal({ isOpen, onClose, cartItems, onSuccess }: Props) {
  const [step, setStep] = useState(1);
  const [selectedShip, setSelectedShip] = useState("");
  
  const [selectedTable, setSelectedTable] = useState<number | string | null>(null);

  if (!isOpen) return null;

  const airships = [
    { name: "Zeppelin Luxury", desc: "Slow & Steady, Panoramic Views" },
    { name: "Falcon Express", desc: "Modern, High-Altitude Dining" },
    { name: "The Cloud Cruiser", desc: "Open-Deck Garden Experience" }
  ];

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price.replace("€", "")), 0);

  const handleFinalize = () => {
    alert(`Reservierung für ${selectedShip} erfolgreich!`);
    onSuccess(); // Clears the cart
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-[#1a1a1a] border border-[#e7d8a9]/30 w-full max-w-5xl h-[80vh] rounded-xl overflow-hidden flex shadow-2xl">
        
        <div className="flex-1 p-10 overflow-y-auto">
          {/* Progress Bar */}
          <div className="flex gap-4 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`h-1 flex-1 rounded ${step >= i ? "bg-[#e7d8a9]" : "bg-zinc-800"}`} />
            ))}
          </div>

          {/* STEP 1: SHIP SELECTION */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-[#e7d8a9] text-3xl font-serif mb-6">Wählen Sie Ihr Luftschiff</h2>
              <div className="grid gap-4">
                {airships.map((ship) => (
                  <button 
                    key={ship.name}
                    onClick={() => { setSelectedShip(ship.name); setStep(2); }}
                    className="p-6 border border-white/10 rounded-lg text-left hover:border-[#e7d8a9] transition-all group"
                  >
                    <h3 className="text-white text-xl font-bold group-hover:text-[#e7d8a9]">{ship.name}</h3>
                    <p className="text-gray-400 text-sm">{ship.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: TABLE OR WHOLE SHIP */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-[#e7d8a9] text-3xl font-serif">Sitzplan: {selectedShip}</h2>
                  <p className="text-gray-400">Wählen Sie einen Tisch oder chartern Sie das gesamte Schiff.</p>
                </div>
                <button 
                  onClick={() => { setSelectedTable("Ganzes Schiff"); setStep(3); }}
                  className="bg-[#e7d8a9]/10 border border-[#e7d8a9] text-[#e7d8a9] px-6 py-3 rounded-lg font-bold hover:bg-[#e7d8a9] hover:text-black transition-all"
                >
                  🚀 Ganzes Schiff reservieren
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4 p-8 bg-zinc-900/50 rounded-xl border border-white/5">
                {[...Array(12)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelectedTable(i + 1); setStep(3); }}
                    className="h-16 rounded border border-white/20 text-white hover:border-[#e7d8a9] transition-all"
                  >
                    Tisch {i + 1}
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(1)} className="mt-4 text-gray-500 hover:text-white transition-colors">← Zurück</button>
            </div>
          )}

          {/* STEP 3: FINAL INFO */}
          {step === 3 && (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              <h2 className="text-[#e7d8a9] text-3xl font-serif mb-6">Abschluss</h2>
              <div className="space-y-4">
                <div className="p-6 bg-zinc-900 rounded-lg border border-[#e7d8a9]/20">
                  <p className="text-gray-400 text-sm uppercase tracking-widest">Ihre Wahl:</p>
                  <p className="text-white text-xl font-bold">
                    {selectedShip} — {selectedTable === "Ganzes Schiff" ? "Privat-Charter" : `Tisch ${selectedTable}`}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="flex flex-col">
                      <label htmlFor="fly-date" className="text-xs text-gray-500 mb-1 ml-1">Flugdatum</label>
                      <input id="fly-date" type="date" aria-label="Flugdatum" className="bg-zinc-800 border-none p-3 rounded text-white" />
                   </div>
                   <div className="flex flex-col">
                      <label htmlFor="fly-name" className="text-xs text-gray-500 mb-1 ml-1">Passagier-Name</label>
                      <input id="fly-name" type="text" placeholder="Name" aria-label="Name" className="bg-zinc-800 border-none p-3 rounded text-white" />
                   </div>
                </div>

                <button 
                  onClick={handleFinalize}
                  className="w-full bg-[#e7d8a9] text-black py-4 rounded font-bold hover:bg-white transition-all shadow-lg"
                >
                  Bestätigen & Bezahlen ({selectedTable === "Ganzes Schiff" ? total + 500 : total}€)
                </button>
                <button onClick={() => setStep(2)} className="w-full text-center text-gray-500 hover:text-white mt-2">← Sitzplan ändern</button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-black/40 border-l border-white/10 p-8 flex flex-col">
          <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6 pb-2 border-b border-white/10">Ihre Bestellung</h3>
          <div className="flex-1 overflow-y-auto space-y-4">
            {cartItems.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-300">{item.title}</span>
                <span className="text-[#e7d8a9]">{item.price}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[#e7d8a9]/50">
            <div className="flex justify-between text-xl font-bold text-white">
              <span>Total:</span>
              <span>{total}€</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}