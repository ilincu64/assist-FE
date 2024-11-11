const sugestionMockup = [
  {
    name: 'Payment method',
  },
  {
    name: 'Selling fees',
  },
  {
    name: 'Items authenticity',
  },
  {
    name: 'Return policy',
  },
  {
    name: 'Adding an item',
  },
];

const SuggestionBox = () => {
  const onClickSuggestion = () => {
    // TODO send to be api
  };
  return (
    <div className='p-2 flex flex-col gap-1 '>
      <p className='text-gray-400'>Suggested topics</p>
      <ul className='w-full  flex gap-2'>
        {sugestionMockup.map((suggestion) => (
          <li
            onClick={onClickSuggestion}
            className='border border-1 border-gray-200 rounded-3xl py-1 px-2 cursor-pointer text-sm hover:bg-gray-100'
            key={suggestion.name}
          >
            {suggestion.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionBox;
