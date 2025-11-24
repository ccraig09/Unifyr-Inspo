import React, { useState } from 'react';
import { X, Check, Trash2, Plus } from 'lucide-react';
import { Todo } from '../types';

interface TodoListProps {
  isOpen: boolean;
  onClose: () => void;
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: (text: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ isOpen, onClose, todos, onToggle, onDelete, onAdd }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
        onAdd(newTodo);
        setNewTodo('');
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar Panel */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-neutral-900 border-l border-neutral-800 z-50 shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Planner</h2>
                <button onClick={onClose} className="text-neutral-400 hover:text-white">
                    <X size={20} />
                </button>
            </div>

            {/* Add Input */}
            <form onSubmit={handleAdd} className="mb-6 relative">
                <input 
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a task..."
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 pr-10 text-white focus:outline-none focus:border-yellow-400 placeholder:text-neutral-500"
                />
                <button 
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-yellow-400 hover:text-white p-1"
                >
                    <Plus size={18} />
                </button>
            </form>

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-3">
                {todos.length === 0 && (
                    <div className="text-center text-neutral-500 py-10 text-sm">
                        No tasks yet. Start planning!
                    </div>
                )}
                {todos.map(todo => (
                    <div key={todo.id} className="group flex items-center justify-between bg-neutral-800/50 p-3 rounded-xl border border-transparent hover:border-neutral-700 transition-colors">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <button 
                                onClick={() => onToggle(todo.id)}
                                className={`flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${todo.completed ? 'bg-yellow-400 border-yellow-400 text-black' : 'border-neutral-600 hover:border-yellow-400'}`}
                            >
                                {todo.completed && <Check size={12} strokeWidth={4} />}
                            </button>
                            <span className={`text-sm truncate ${todo.completed ? 'text-neutral-500 line-through' : 'text-white'}`}>
                                {todo.text}
                            </span>
                        </div>
                        <button 
                            onClick={() => onDelete(todo.id)}
                            className="text-neutral-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-neutral-800 text-center">
                <p className="text-xs text-neutral-500">
                    {todos.filter(t => t.completed).length}/{todos.length} tasks completed
                </p>
            </div>
        </div>
      </div>
    </>
  );
};
