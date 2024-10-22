import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { io } from 'socket.io-client';
import Header from './components/Header';
import FamilyTree from './components/FamilyTree';
import SearchFilter from './components/SearchFilter';
import ExportTree from './components/ExportTree';
import UserManagement from './components/UserManagement';
import { FamilyMember } from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const socket = io(API_URL);

function App() {
  const [familyTree, setFamilyTree] = useState<FamilyMember[]>([]);
  const [surname, setSurname] = useState('');

  useEffect(() => {
    // Fetch initial family tree data
    fetch(`${API_URL}/api/family-tree`)
      .then(response => response.json())
      .then(data => {
        setFamilyTree(data.familyTree);
        setSurname(data.surname);
      });

    // Listen for real-time updates
    socket.on('treeUpdate', (updatedTree: FamilyMember[]) => {
      setFamilyTree(updatedTree);
    });

    return () => {
      socket.off('treeUpdate');
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header surname={surname} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              <>
                <SearchFilter familyTree={familyTree} />
                <FamilyTree familyTree={familyTree} setFamilyTree={setFamilyTree} socket={socket} />
              </>
            } />
            <Route path="/export" element={<ExportTree familyTree={familyTree} surname={surname} />} />
            <Route path="/users" element={<UserManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;