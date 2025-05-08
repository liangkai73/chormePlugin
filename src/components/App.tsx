import React, { useState } from 'react';
import AIAssistant from './AIAssistant';
import SettingsPanel from './SettingsPanel';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'assistant' | 'settings'>('assistant');

  return (
    <div className="p-4 h-full flex flex-col bg-gray-50">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">AI Assistant</h1>
      </header>
      
      <div className="flex border-b mb-4">
        <button 
          className={`px-4 py-2 ${activeTab === 'assistant' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('assistant')}
        >
          AI Assistant
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'settings' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>
      
      <div className="flex-1 overflow-auto">
        {activeTab === 'assistant' ? (
          <AIAssistant />
        ) : (
          <SettingsPanel />
        )}
      </div>
      
      <footer className="mt-4 text-center text-sm text-gray-500">
        AI Assistant v1.0.0
      </footer>
    </div>
  );
};

export default App; 