import clsx from 'clsx';

interface AiChatBoxProps {
  message?: string;
}
const AiChatBox = ({ message }: AiChatBoxProps) => {
  // verification to see if message is from user or ai in order to show different styling
  // const isAIMessage = message.id !== sessionStorage.user.id
  const isAiMessage = true; // placeholder for logic

  return (
    <div className='p-4 flex flex-col flex-1 scroll-auto'>
      <div
        className={clsx(
          isAiMessage ? 'justify-start ' : 'justify-end',
          'flex w-full'
        )}
      >
        {/* to be added map of mesages here */}
        <div
          className={clsx(
            isAiMessage ? '' : 'bg-primary text-white',
            'p-2 border border-gray-100 rounded-md'
          )}
        >
          <p>{message}</p>
        </div>
      </div>
      {/* sugested topics */}
      {/* map here on all topics */}
    </div>
  );
};

export default AiChatBox;
