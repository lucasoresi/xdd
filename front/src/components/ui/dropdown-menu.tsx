import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ 
  trigger, 
  children, 
  align = 'right' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 focus:outline-none"
      >
        {trigger}
      </button>
      
      {isOpen && (
        <div className={`absolute top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50 ${
          align === 'right' ? 'right-0' : 'left-0'
        }`}>
          {children}
        </div>
      )}
    </div>
  );
};

interface DropdownMenuItemProps {
  onClick?: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ 
  onClick, 
  icon, 
  children, 
  className = '' 
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 ${className}`}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

interface DropdownMenuSeparatorProps {}

export const DropdownMenuSeparator: React.FC<DropdownMenuSeparatorProps> = () => {
  return <hr className="my-1 border-gray-200" />;
};