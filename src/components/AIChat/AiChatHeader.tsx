import { IoIosClose } from 'react-icons/io';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

interface AiChatHeaderProps {
  setIsOpen: (isOpen: boolean) => void;
}
const AiChatHeader = ({ setIsOpen }: AiChatHeaderProps) => {
  return (
    <div className='flex justify-between items-center p-4 border-b  border-gray-100'>
      <div className='flex justify-center items-center gap-1'>
        <Avatar>
          <AvatarImage src='/assets/ai/robot.jpg' />
        </Avatar>
        <p className=' text-primary font-onest '>Support Bot</p>
      </div>
      <div className='flex justify-center items-center gap-1'>
        <Link className=' underline text-primary font-medium' to='#'>
          {' '}
          Request Support
        </Link>

        <Button
          variant='ghost'
          className=' flex justify-center items-center p-0'
        >
          <IoIosClose size={25} color='gray' onClick={() => setIsOpen(false)} />
        </Button>
      </div>
    </div>
  );
};

export default AiChatHeader;
