export interface FamilyMember {
  id: string;
  firstName: string;
  gender: 'M' | 'F';
  isDeceased: boolean;
  generation: number;
  partners: string[];
}