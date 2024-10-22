import React, { useState } from 'react';
import { FamilyMember } from '../types';
import * as LucideIcons from 'lucide-react';

interface AddMemberFormProps {
  addMember: (newMember: FamilyMember) => void;
  generation: number;
}

const AddMemberForm: React.FC<AddMemberFormProps> = ({ addMember, generation }) => {
  const [newMember, setNewMember] = useState<Omit<FamilyMember, 'id'>>({
    firstName: '',
    gender: 'M',
    isDeceased: false,
    generation,
    partners: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMember({ ...newMember, id: Date.now().toString() });
    setNewMember({
      firstName: '',
      gender: 'M',
      isDeceased: false,
      generation,
      partners: []
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewMember(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Add New Family Member</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block mb-1">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={newMember.firstName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="gender" className="block mb-1">Gender</label>
          <select
            id="gender"
            name="gender"
            value={newMember.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isDeceased"
              checked={newMember.isDeceased}
              onChange={e => setNewMember(prev => ({ ...prev, isDeceased: e.target.checked }))}
              className="mr-2"
            />
            Deceased
          </label>
        </div>
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <LucideIcons.UserPlus className="inline-block mr-2" />
          Add Member
        </button>
      </div>
    </form>
  );
};

export default AddMemberForm;