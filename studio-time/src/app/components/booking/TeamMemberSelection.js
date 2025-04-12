'use client';
import { useState } from 'react';
import { format, addDays } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function TeamMemberSelection({ 
  teamMembers, 
  onSelect, 
  onNext, 
  onBack, 
  isOptional,
  selectedDates 
}) {
  const [selectedMember, setSelectedMember] = useState(null);

  // Safe date formatting function
  const safeFormat = (date, formatStr) => {
    try {
        if (!date || !(date instanceof Date)) return '';
        return format(date, formatStr);
      } catch {
        return '';
      }
  };

  // Filter members available on selected dates
  const getAvailableMembers = () => {
    if (!selectedDates || !selectedDates.startDate) return teamMembers;
    
    try {
      const dates = [selectedDates.startDate];
      
      if (selectedDates.endDate) {
        let current = new Date(selectedDates.startDate);
        const end = new Date(selectedDates.endDate);
        
        while (current <= end) {
          dates.push(safeFormat(current, 'yyyy-MM-dd'));
          current = addDays(current, 1);
        }
      }
      
      return teamMembers.filter(member => {
        // If member doesn't have availability data, assume available
        if (!member.available) return true;
        return dates.every(date => member.available.includes(date));
      });
    } catch (error) {
      console.error('Error filtering team members:', error);
      return teamMembers;
    }
  };

  const handleSelect = (member) => {
    setSelectedMember(member);
    onSelect(member);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {isOptional ? 'Select Team Member (Optional)' : 'Select Team Member'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {getAvailableMembers().map((member) => (
          <Card 
            key={member.id}
            className={`p-4 cursor-pointer transition-all ${
              selectedMember?.id === member.id 
                ? 'border-primary border-2 bg-primary/10' 
                : 'hover:border-primary/50'
            }`}
            onClick={() => handleSelect(member)}
          >
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={`/team/${member.id}.jpg`} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
                <p className="text-sm mt-1">R{member.rate}/hour</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!isOptional && !selectedMember}>
          Next
        </Button>
      </div>
    </div>
  );
}