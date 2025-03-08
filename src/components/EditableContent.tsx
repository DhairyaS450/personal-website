"use client";

import { useState, useEffect, useRef, ElementType } from 'react';
import { useContent } from '@/contexts/ContentContext';

interface EditableContentProps {
  value: string;
  onChange: (newValue: string) => void;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
  className?: string;
  isTextArea?: boolean;
  isPlainValue?: boolean;
}

const EditableContent: React.FC<EditableContentProps> = ({
  value,
  onChange,
  as = 'p',
  className = '',
  isTextArea = false,
  isPlainValue = false
}) => {
  const { isEditMode } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const editRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    // Update the edit value when the actual value changes
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    // Auto-focus the input when editing starts
    if (isEditing && editRef.current) {
      editRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    // Handle clicking outside to save and exit edit mode
    function handleClickOutside(event: MouseEvent) {
      if (editRef.current && !editRef.current.contains(event.target as Node)) {
        saveAndExit();
      }
    }

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, editValue]);

  const startEditing = () => {
    if (!isEditMode) return;
    setIsEditing(true);
  };

  const saveAndExit = () => {
    setIsEditing(false);
    if (editValue !== value) {
      onChange(editValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isTextArea) {
      saveAndExit();
    } else if (e.key === 'Escape') {
      // Reset to original value on escape
      setEditValue(value);
      setIsEditing(false);
    } else if (e.key === 'Enter' && e.ctrlKey && isTextArea) {
      // Ctrl+Enter to save in textarea
      saveAndExit();
    }
  };

  // Render the input/textarea when in edit mode
  if (isEditing) {
    const commonProps = {
      value: editValue,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEditValue(e.target.value),
      onKeyDown: handleKeyDown,
      className: `w-full px-2 py-1 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`,
      ref: editRef as any,
    };

    return isTextArea ? (
      <textarea
        {...commonProps}
        rows={5}
        className={`${commonProps.className} min-h-[100px]`}
      />
    ) : (
      <input {...commonProps} type="text" />
    );
  }

  // Render the content when not editing
  const Component = as as ElementType;
  const contentClass = `${className} ${isEditMode ? 'cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 hover:ring-2 hover:ring-blue-300 dark:hover:ring-blue-700 p-1 rounded transition-colors' : ''}`;
  
  return (
    <Component className={contentClass} onClick={startEditing}>
      {isPlainValue ? value : isEditMode ? (
        <>
          {value} <span className="text-xs text-blue-500 ml-1">(Click to edit)</span>
        </>
      ) : (
        value
      )}
    </Component>
  );
};

export default EditableContent; 