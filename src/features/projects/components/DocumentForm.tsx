import React, { useState, useEffect } from 'react';
import UIButton from './UIButton';

interface DocumentFormProps {
  onClose: () => void;
  onCreate: (name: string, content: string, ) => void;
}

const DocumentForm: React.FC<DocumentFormProps> = ({ onClose, onCreate }) => {
  const [name, setName] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);


  useEffect(() => {
    setIsFormValid(name.trim() !== '' && content.trim() !== '');
  }, [name, content]);

  const handleCreate = () => {
    if (isFormValid) {
      onCreate(name, content);
      setName('');
      setContent('');
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isFormValid) handleCreate();
    if (e.key === 'Escape') onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" 
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Create Document</h2>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Document Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded-lg"
            onKeyDown={handleKeyPress}
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border p-2 rounded-lg"
            onKeyDown={handleKeyPress}
          />
        </div>

        {!isFormValid && <p className="text-red-500 text-sm mb-4">Both fields are required.</p>}

        <div className="flex justify-end gap-4">
          <UIButton label="Cancel" onClick={onClose} className="bg-gray-500 text-white" />
          <UIButton
            label="Create"
            onClick={handleCreate}
            className={`bg-blue-600 text-white ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isFormValid}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentForm;
