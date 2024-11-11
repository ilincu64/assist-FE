import { useState } from 'react';
import { Input } from '../ui/input';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { Button } from '../ui/button';

const AiInputBox = () => {
  const [askAiInputMessage, setAskAiInputMessage] = useState('');

  const submitMessageToAi = () => {
    // TODO: send message to AI
  };
  return (
    <div className='flex items-center justify-center p-2 gap-2'>
      <Input
        placeholder='Type your question'
        onChange={(e) => setAskAiInputMessage(e.target.value)}
      />
      <Button
        className='bg-primary rounded-md justify-center items-center px-3'
        onClick={submitMessageToAi}
        type='button'
      >
        <IoPaperPlaneOutline color='white' size={20} />
      </Button>
    </div>
  );
};

export default AiInputBox;
