"use client";

import { useState } from 'react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { useContent } from '@/contexts/ContentContext';

interface EditableListProps {
  items: string[];
  onChange: (newItems: string[]) => void;
  className?: string;
  listClassName?: string;
  itemClassName?: string;
  placeholder?: string;
  listType?: 'ul' | 'ol';
}

const EditableList: React.FC<EditableListProps> = ({
  items,
  onChange,
  className = '',
  listClassName = '',
  itemClassName = '',
  placeholder = 'Add a new item...',
  listType = 'ul',
}) => {
  const { isEditMode } = useContent();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [newItemValue, setNewItemValue] = useState('');

  const startEditing = (index: number) => {
    if (!isEditMode) return;
    setEditingIndex(index);
    setEditValue(items[index]);
  };

  const saveEdit = () => {
    if (editingIndex === null) return;
    
    const newItems = [...items];
    newItems[editingIndex] = editValue;
    onChange(newItems);
    setEditingIndex(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditValue('');
  };

  const addItem = () => {
    if (!newItemValue.trim()) return;
    const newItems = [...items, newItemValue];
    onChange(newItems);
    setNewItemValue('');
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  const handleKeyDown = (e: React.KeyboardEvent, isNewItem: boolean = false) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isNewItem) {
        addItem();
      } else {
        saveEdit();
      }
    } else if (e.key === 'Escape') {
      if (isNewItem) {
        setNewItemValue('');
      } else {
        cancelEdit();
      }
    }
  };

  const ListComponent = listType === 'ol' ? 'ol' : 'ul';

  return (
    <div className={`${className}`}>
      <ListComponent className={`list-${listType === 'ol' ? 'decimal' : 'disc'} ml-5 ${listClassName}`}>
        {items.map((item, index) => (
          <li 
            key={index} 
            className={`my-2 ${itemClassName} ${isEditMode ? 'group' : ''}`}
          >
            {editingIndex === index ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-grow p-1 border border-blue-400 rounded"
                  autoFocus
                />
                <button 
                  onClick={saveEdit}
                  className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button 
                  onClick={cancelEdit}
                  className="p-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-start group">
                <span 
                  className={isEditMode ? "cursor-pointer" : ""}
                  onClick={() => isEditMode && startEditing(index)}
                >
                  {item}
                </span>
                {isEditMode && (
                  <div className="ml-2 opacity-0 group-hover:opacity-100 flex gap-1">
                    <button
                      onClick={() => startEditing(index)}
                      className="p-1 text-blue-500 hover:text-blue-700"
                      aria-label="Edit item"
                    >
                      <FaEdit size={12} />
                    </button>
                    <button
                      onClick={() => removeItem(index)}
                      className="p-1 text-red-500 hover:text-red-700"
                      aria-label="Remove item"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ListComponent>
      
      {isEditMode && (
        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            value={newItemValue}
            onChange={(e) => setNewItemValue(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, true)}
            placeholder={placeholder}
            className="flex-grow p-2 border border-gray-300 dark:border-gray-700 rounded"
          />
          <button
            onClick={addItem}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
            disabled={!newItemValue.trim()}
          >
            <FaPlus className="mr-1" size={12} /> Add
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableList; 