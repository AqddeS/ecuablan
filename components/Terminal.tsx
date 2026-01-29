import React, { useState, useEffect, useRef } from 'react';

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>([
    "CyberShield OS v4.2.0 [Secure Boot]",
    "Initializing defensive protocols...",
    "System secure. Ready for input.",
    "Type 'help' for available commands."
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response = '';

    switch (trimmed) {
      case 'help':
        response = "Available commands: help, status, scan, clear, defense";
        break;
      case 'status':
        response = "SYSTEM INTEGRITY: 100% | FIREWALL: ACTIVE | THREAT LEVEL: LOW";
        break;
      case 'scan':
        response = "Scanning network... No active breaches detected. All ports secured.";
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'defense':
        response = "Active defenses: SQL Injection Shield, XSS Filter, Fraud Detection AI.";
        break;
      case '':
        return;
      default:
        response = `Command not found: ${trimmed}`;
    }

    setHistory(prev => [...prev, `> ${cmd}`, response]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="w-full h-96 bg-black border border-green-700/50 rounded-sm p-4 font-mono text-sm md:text-base overflow-hidden shadow-[inset_0_0_20px_rgba(0,50,0,0.5)] flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
        {history.map((line, i) => (
          <div key={i} className={`${line.startsWith('>') ? 'text-green-300' : 'text-green-500/80'}`}>
            {line}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="mt-2 flex items-center border-t border-green-900/50 pt-2">
        <span className="text-green-500 mr-2">{'>'}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none text-green-400 w-full placeholder-green-800"
          placeholder="Enter command..."
          autoFocus
        />
      </div>
    </div>
  );
};

export default Terminal;