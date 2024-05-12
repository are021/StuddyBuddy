'use client';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';


const CustomTextArea = () => {
  const [notes, setNotes] = useState<string>('');
  return (
    <Textarea
      placeholder="Paste here"
      rows={20}
      value={notes}
      onChange={(e) => {
        setNotes(e.target.value);
      }}
    />
  );
};

export default CustomTextArea;
