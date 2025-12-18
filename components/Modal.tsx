import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-bounce-short" style={{ animationIterationCount: 1 }}>
        <div className="flex justify-between items-center p-4 bg-pink-100 border-b border-pink-200">
          <h2 className="text-xl font-bold text-pink-600">{title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-pink-200 rounded-full transition-colors">
            <X className="w-6 h-6 text-pink-500" />
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto no-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};
