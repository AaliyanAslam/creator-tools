"use client";

import { useEffect, useState } from "react";
import GetUserPhoneNumberModal from "./GetUserPhoneNumberModal";

export default function ClientWrapper({ children }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const alreadySubmitted = localStorage.getItem("phoneSubmitted");

    if (alreadySubmitted) return;

    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000); // 10 sec

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {children}

      <GetUserPhoneNumberModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}