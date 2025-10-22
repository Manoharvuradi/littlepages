import React from "react";

interface StaticNavbarProps {
  selectedCount?: number;
  hasSelection?: boolean;
  onClearSelection?: () => void;
  onEdit?: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
}

const StaticNavbar: React.FC<StaticNavbarProps> = ({
  selectedCount,
  hasSelection,
  onClearSelection,
  onEdit,
  onDownload,
  onDelete,
}) => {
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 py-3 flex items-center justify-between transition-colors duration-400
        ${hasSelection ? "bg-[rgb(16,35,113)] text-white shadow-lg" : "bg-white text-gray-800 shadow-md"}
      `}
    >
      {/* Left Section */}
      <div className="flex items-center space-x-3">
        {hasSelection ? (
          <>
            <button
              onClick={onClearSelection}
              className="p-2 rounded-full hover:bg-white/20 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <span className="text-lg font-semibold">
              {selectedCount} selected
            </span>
          </>
        ) : (
          <span className="font-bold text-lg">Little Pages</span>
        )}
      </div>

      {/* Right Section */}
      {hasSelection ? (
        <div className="flex items-center space-x-3">
          <button
            onClick={onEdit}
            className="px-3 py-1.5 rounded-md bg-white text-[rgb(16,35,113)] font-semibold hover:bg-gray-100 transition"
          >
            Edit
          </button>
          <button
            onClick={onDownload}
            className="px-3 py-1.5 rounded-md bg-white text-[rgb(16,35,113)] font-semibold hover:bg-gray-100 transition"
          >
            Download
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-1.5 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            LP
          </div>
        </div>
      )}
    </nav>
  );
};

export default StaticNavbar;