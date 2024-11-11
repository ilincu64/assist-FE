import { useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';

const portfolioNavLinks = [
  {
    name: 'Active',
    path: '?page=active',
    active: 'active',
  },
  {
    name: 'Past',
    path: '?page=past',
    active: 'past',
  },
  {
    name: 'My auctions',
    path: '?page=my-auctions',
    active: 'my-auctions',
  },
];

const PortfolioMainNav = () => {
  const [hasNotification, setHasNotification] = useState(false);
  const [searthParams] = useSearchParams();
  const currentPage = searthParams.get('page');

  const notificationCount = 1;
  // todo notification count
  // todo incoming notifications

  return (
    <nav className='  flex  gap-3 p-4 font-onest font-semibold border-b border-gray-100 md:gap-6 md:font-normal'>
      {portfolioNavLinks.map((link) => (
        <div className='flex gap-2 ' key={link.name}>
          <NavLink
            to={`/portfolio${link.path}`}
            className={
              currentPage === link.active
                ? '  text-activeLink border-b border-activeLink'
                : 'inactive text-gray-600'
            }
          >
            {link.name}
          </NavLink>
          {hasNotification && link.path === 'active' && (
            <div className='bg-notificationDotBg px-2.5  rounded-full '>
              <p>{notificationCount}</p>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default PortfolioMainNav;

// active past my auctions
