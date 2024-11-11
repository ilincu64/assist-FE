import { useState } from 'react';

import AiChatBox from './AiChatBox';
import AiChatHeader from './AiChatHeader';
import AiInputBox from './AiInputBox';
import AiChatButton from './AiChatButton';

import SuggestionBox from './SuggestionBox';

const AiChatContainer = () => {
  const [chatIsOpen, setChatIsOpen] = useState(false);

  return (
    <div className='fixed right-0 bottom-0  rounded-2xl  m-4 z-40'>
      {!chatIsOpen && (
        <AiChatButton onClick={() => setChatIsOpen(!chatIsOpen)} />
      )}
      {chatIsOpen && (
        <div className='bg-white rounded-2xl w-full h-full md:w-[623px] md:h-[459px] flex flex-col fixed right-0 bottom-0  border border-1 shadow-2xl'>
          <AiChatHeader setIsOpen={setChatIsOpen} />
          <AiChatBox message='hello i am here to help' />
          <SuggestionBox />
          <AiInputBox />
        </div>
      )}
    </div>
  );
};

export default AiChatContainer;
