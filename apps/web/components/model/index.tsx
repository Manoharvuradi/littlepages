// components/Modal.tsx
'use client';

import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center w-full h-full bg-[#0A1A6B] text-white">
          <div className="loader mb-4"></div>
          <p className="text-sm tracking-wide opacity-80">Loading...</p>
          <style jsx>{`
            .loader {
              width: 40px;
              height: 40px;
              border: 4px solid rgba(255, 255, 255, 0.3);
              border-top-color: white;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </div>
      ) : (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-transparent border-0">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-white-800 text-xl cursor-pointer"
          >
            ✕
          </button>
          <div
            className="w-full h-full flex items-center justify-center bg-[#0A1A6B] border-0"
            style={{ border: "none", boxShadow: "none" }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;