'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';

export default function TeamMemberSelection({ teamMembers, onSelect, onNext, onBack }) {
  const [selectedMember, setSelectedMember] = useState(null);

  const handleSelect = (member) => {
    setSelectedMember(member);
    onSelect(member);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Team Member (Optional)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {teamMembers.map((member) => (
          <Card 
            key={member.id}
            className={`p-4 cursor-pointer ${selectedMember?.id === member.id ? 'border-primary border-2' : ''}`}
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
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  );
}