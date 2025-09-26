import React from 'react'

const UserUploads = ({ 
    previewUrls, 
    selected, 
    setSelected 
}: { 
    previewUrls: string[], 
    selected: boolean[], 
    setSelected: React.Dispatch<React.SetStateAction<boolean[]>>;
}) => {
  return (
    <div>
      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {previewUrls.map((url, idx) => (
            <div
              key={idx}
              className="relative rounded-lg overflow-hidden shadow cursor-pointer"
              onClick={() =>
                setSelected((prev) => {
                  const updated = [...prev];
                  updated[idx] = !updated[idx]; // toggle check
                  return updated;
                })
              }
            >
              <img
                src={url}
                alt={`Preview ${idx + 1}`}
                className="w-full h-40 object-cover"
              />

              {/* Checkmark Overlay */}
              <div
                className={`absolute top-2 right-2 w-6 h-6 rounded-sm border-2 flex items-center justify-center ${
                  selected[idx] ? "bg-[#128C7E] border-[#128C7E]" : "bg-white border-[#128C7E]"
                }`}
              >
                {selected[idx] &&  (
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><polyline points="20 6 9 17 4 12"></polyline></svg>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserUploads
