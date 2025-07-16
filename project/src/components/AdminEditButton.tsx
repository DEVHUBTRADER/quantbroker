import React, { useState } from 'react';
import { Edit3, Save, X } from 'lucide-react';

interface AdminEditButtonProps {
  isAdmin: boolean;
  month: string;
  year: number;
  asset: string;
  currentValue: number | null;
  onUpdate: (month: string, year: number, asset: string, value: number | null) => void;
}

const AdminEditButton: React.FC<AdminEditButtonProps> = ({ 
  isAdmin, 
  month,
  year,
  asset,
  currentValue, 
  onUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(currentValue?.toString() || '');

  const handleSave = () => {
    const newValue = parseFloat(inputValue);
    onUpdate(month, year, asset, isNaN(newValue) ? null : newValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setInputValue(currentValue?.toString() || '');
    setIsEditing(false);
  };

  // Don't render anything if not admin
  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
      >
        <Edit3 className="h-3 w-3 text-gray-600" />
      </button>

      {isEditing && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <input
            type="number"
            step="0.1"
            placeholder="Resultado %"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded mb-2"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSave();
              }
            }}
          />
          <div className="flex gap-1">
            <button
              onClick={handleSave}
              className="flex-1 px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 flex items-center justify-center"
            >
              <Save className="h-3 w-3" />
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 px-2 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700 flex items-center justify-center"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminEditButton;