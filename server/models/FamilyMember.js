import mongoose from 'mongoose';

const familyMemberSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  gender: { type: String, enum: ['M', 'F'], required: true },
  isDeceased: { type: Boolean, default: false },
  generation: { type: Number, required: true },
  partners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FamilyMember' }]
});

export default mongoose.model('FamilyMember', familyMemberSchema);