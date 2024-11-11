import clsx from 'clsx';

import { MdOutlineChatBubbleOutline } from 'react-icons/md';
import { useEffect, useState } from 'react';

interface AiChatButtonProps {
  onClick: () => void;
}
const AiChatButton = ({ onClick }: AiChatButtonProps) => {
  const [messagePop, isMessagePop] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      isMessagePop(false);
    }, 6000);
  });

  return (
    <div className='flex gap-2 justify-center items-center' onClick={onClick}>
      <div
        className={clsx(
          messagePop ? 'block' : 'hidden',
          `p-3  bg-white rounded-3xl border-2 border-primary transition `
        )}
      >
        <p>I’m here if you need help!</p>
      </div>
      <div className='flex justify-center items-center rounded-full bg-primary w-14 h-14 hover:bg-blue-900 transition cursor-pointer hover:scale-125'>
        <MdOutlineChatBubbleOutline color='white' size={24} />
      </div>
    </div>
  );
};

export default AiChatButton;
