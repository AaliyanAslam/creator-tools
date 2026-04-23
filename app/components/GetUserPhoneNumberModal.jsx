"use client";

import { useState, useEffect } from "react";
import { db } from "@/config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { urbanist } from "../fonts";

const GetUserPhoneNumberModal = ({ isOpen, onClose }) => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone) return alert("Enter phone number");

    setLoading(true);
    try {
      await addDoc(collection(db, "leads"), {
        phone,
        page: window.location.pathname,
        createdAt: serverTimestamp(),
      });

      localStorage.setItem("phoneSubmitted", "true"); // dubara na aaye
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error saving number");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-9999 flex items-center justify-center bg-black/50 ${urbanist.className}`}
    >
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md text-center">
        <h2 className="text-xl font-bold mb-3">Enter Your Phone</h2>
        <p className="text-sm text-gray-500 mb-4">
          Get latest updates & offers
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="tel"
            placeholder="03XXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white py-2 rounded-lg"
          >
            {loading ? "Saving..." : "Submit"}
          </button>
        </form>

        <button onClick={onClose} className="mt-3 text-xs text-gray-400">
          Skip
        </button>
      </div>
    </div>
  );
};

export default GetUserPhoneNumberModal;
