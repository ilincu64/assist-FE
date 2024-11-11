type Props = {
  introduction: string;
  message: string;
};

export default function HeaderBox({ introduction, message }: Props) {
  return (
    <>
      <h1 className='font-semibold mb-2 text-textPrimary text-3xl sm:text-4xl'>
        {introduction}
      </h1>
      <p className='text-textGray'>{message}</p>
    </>
  );
}
