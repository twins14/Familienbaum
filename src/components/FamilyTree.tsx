import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import { FamilyMember } from '../types';
import FamilyMemberCard from './FamilyMemberCard';
import AddMemberForm from './AddMemberForm';

interface FamilyTreeProps {
  familyTree: FamilyMember[];
  setFamilyTree: React.Dispatch<React.SetStateAction<FamilyMember[]>>;
  socket: Socket;
}

const FamilyTree: React.FC<FamilyTreeProps> = ({ familyTree, setFamilyTree, socket }) => {
  const [selectedGeneration, setSelectedGeneration] = useState(0);

  const addMember = (newMember: FamilyMember) => {
    const updatedTree = [...familyTree, newMember];
    setFamilyTree(updatedTree);
    socket.emit('updateTree', updatedTree);
  };

  const updateMember = (updatedMember: FamilyMember) => {
    const updatedTree = familyTree.map(member => 
      member.id === updatedMember.id ? updatedMember : member
    );
    setFamilyTree(updatedTree);
    socket.emit('updateTree', updatedTree);
  };

  const currentGenerationMembers = familyTree.filter(
    member => member.generation === selectedGeneration
  );

  const maxGeneration = Math.max(...familyTree.map(member => member.generation), 0);

  return (
    <div className="mt-8">
      <div className="mb-4">
        <label htmlFor="generation" className="mr-2">Select Generation:</label>
        <select
          id="generation"
          value={selectedGeneration}
          onChange={(e) => setSelectedGeneration(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {[...Array(maxGeneration + 2)].map((_, i) => (
            <option key={i} value={i}>Generation {i + 1}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentGenerationMembers.map(member => (
          <FamilyMemberCard
            key={member.id}
            member={member}
            updateMember={updateMember}
            familyTree={familyTree}
          />
        ))}
      </div>
      <AddMemberForm addMember={addMember} generation={selectedGeneration} />
    </div>
  );
};

export default FamilyTree;