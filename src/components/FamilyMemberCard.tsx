import React, { useState } from 'react';
import { FamilyMember } from '../types';
import * as LucideIcons from 'lucide-react';

interface FamilyMemberCardProps {
  member: FamilyMember;
  updateMember: (updatedMember: FamilyMember) => void;
  familyTree: FamilyMember[];
}

const FamilyMemberCard: React.FC<FamilyMemberCardProps> = ({ member, updateMember, familyTree }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMember, setEditedMember] = useState(member);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateMember(editedMember);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedMember(member);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedMember(prev => ({ ...prev, [name]: value }));
  };

  const getPartnerNames = () => {
    return member.partners.map(partnerId => 
      familyTree.find(m => m.id === partnerId)?.firstName || 'Unknown'
    ).join(', ');
  };

  return (
    <div className={`p-4 rounded-lg shadow-md ${member.isDeceased ? 'bg-gray-200' : 'bg-white'}`}>
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            name="firstName"
            value={editedMember.firstName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <select
            name="gender"
            value={editedMember.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isDeceased"
              checked={editedMember.isDeceased}
              onChange={e => setEditedMember(prev => ({ ...prev, isDeceased: e.target.checked }))}
              className="mr-2"
            />
            Deceased
          </label>
          <div className="flex justify-end space-x-2">
            <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded">Save</button>
            <button onClick={handleCancel} className="px-4 py-2 bg-red-500 text-white rounded">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-2">{member.firstName}</h3>
          <p className="mb-1">
            <LucideIcons.User className="inline-block mr-2" />
            {member.gender === 'M' ? 'Male' : 'Female'}
          </p>
          <p className="mb-1">
            <LucideIcons.Users className="inline-block mr-2" />
            Generation: {member.generation + 1}
          </p>
          <p className="mb-1">
            <LucideIcons.Heart className="inline-block mr-2" />
            Partners: {getPartnerNames() || 'None'}
          </p>
          <p className="mb-4">
            <LucideIcons.Activity className="inline-block mr-2" />
            Status: {member.isDeceased ? 'Deceased' : 'Alive'}
          </p>
          <button onClick={handleEdit} className="px-4 py-2 bg-blue-500 text-white rounded">Edit</button>
        </>
      )}
    </div>
  );
};

export default FamilyMemberCard;