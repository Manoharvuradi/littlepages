'use client';

import React, { use } from "react";
import styles from "./staticnavbar.module.scss";
import Image from "next/image";
import { useSelectedImages } from "../../context";

interface StaticNavbarProps {
  selectedCount?: number;
  hasSelection?: boolean;
  onClearSelection?: () => void;
  onEdit?: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
  onClickMenu?: () => void;
  isMobile?: boolean;
}

const StaticNavbar: React.FC<StaticNavbarProps> = ({
  onEdit,
  onDownload,
  onDelete,
  onClickMenu,
  isMobile,
}) => {
  const { selected, setSelected } = useSelectedImages();
  const selectedCount = selected.filter(Boolean).length;
  const hasSelection = selectedCount > 0;

  const onClearSelection = () => {
    setSelected(new Array(selected.length).fill(false))
  };
  return (
    <nav
      className={`${styles.navbar} fixed top-0 left-0 w-full z-50 px-6 py-3 flex items-center justify-between transition-colors duration-400 shadow-md ${
        hasSelection ? "bg-[rgb(16,35,113)] text-white shadow-lg" : "bg-white text-gray-800"
      }`}
    >
      <div className={`${hasSelection ? "hidden" : "flex"}`}>

        <button
            onClick={onClickMenu}
            className="p-2 rounded-md hover:bg-gray-100 transition active:bg-gray-200"
            aria-label="Toggle menu"
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        <Image
          src="/images/logo.png"
          alt="Little Pages Logo"
          width={50}
          height={20}
          className="cursor-pointer object-center"
          // onClick={() => router.push("/")}
        />

      </div>
      {/* Left Section */}
      <div className={`${styles.leftSection} flex items-center space-x-3`}>
        {hasSelection && (
          <>
            <button
              onClick={onClearSelection}
              className="p-2 rounded-full hover:bg-white/20 transition"
              aria-label="Clear selection"
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
            <span className={`${styles.selectedCount} text-lg font-semibold`}>
              {selectedCount} selected
            </span>
          </>
        )}
      </div>

      {/* Right Section */}
      {hasSelection ? (
        <div className={`${styles.rightSection} flex items-center space-x-3`}>
          <button
            onClick={onEdit}
            className={`${styles.actionButton} ${styles.edit} px-3 py-1.5 rounded-md bg-white text-[rgb(16,35,113)] font-semibold hover:bg-gray-100 transition`}
          >
            <span>Edit</span>
          </button>
          <button
            onClick={onDownload}
            className={`${styles.actionButton} ${styles.download} px-3 py-1.5 rounded-md bg-white text-[rgb(16,35,113)] font-semibold hover:bg-gray-100 transition`}
          >
            <span>Download</span>
          </button>
          <button
            onClick={onDelete}
            className={`${styles.actionButton} ${styles.delete} px-3 py-1.5 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition`}
          >
            <span>Delete</span>
          </button>
        </div>
      ) : (
        <div className={`${styles.rightSection} flex items-center space-x-3`}>
          <div className={`${styles.userAvatar} w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer`}>
            LP
          </div>
        </div>
      )}
    </nav>
  );
};

export default StaticNavbar;