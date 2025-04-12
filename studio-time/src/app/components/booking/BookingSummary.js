'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function BookingSummary({ date, time, room, teamMember, onBack, onConfirm }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Booking Summary</h2>
      
      <Card className="p-6 mb-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date:</span>
            <span>{date}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time:</span>
            <span>{time}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Room:</span>
            <span>{room?.name}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Team Member:</span>
            <span>{teamMember?.name || 'None selected'}</span>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-medium">
              <span>Total:</span>
              <span>R {room?.rate || 0}</span>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onConfirm}>
          Confirm & Pay
        </Button>
      </div>
    </div>
  );
}