import { useState } from 'react';
import { IoReorderThreeOutline } from 'react-icons/io5';
import { MdHome, MdCheckCircle, MdBarChart } from 'react-icons/md';
import classNames from 'classnames';
import { FiTarget } from 'react-icons/fi';
import Icon from '../other/Icon';
import NavDrawerLink from './NavDrawerLink';

function NavDrawer() {
  const [isOpen, setIsOpen] = useState(null);

  const navDrawerClass = classNames(
    'relative', 'z-20', 'inline-flex', 'flex-col', 'space-y-2', 'h-screen', 'pt-[4.5rem]', 'pl-4', 'pr-6',
    'bg-gradient-to-b', 'from-secondary', 'to-accent', 'shadow-[3px_0_12px_black]',
    { 'animate-open-nav-drawer': isOpen, 'animate-close-nav-drawer': isOpen === false, 'hidden': isOpen === null }
  );

  const darkeningAreaClass = classNames(
    'absolute', 'z-10', 'top-0', 'left-0', 'h-screen', 'w-screen', 'bg-[rgba(0,_0,_0,_0.6)]',
    { 'animate-show-darkening-area': isOpen, 'animate-hide-darkening-area': isOpen === false, 'hidden': isOpen === null }
  );

  return (
    <>
      <Icon icon={
        <IoReorderThreeOutline className="fixed z-30 top-4 left-4 w-10 h-10" onClick={() => setIsOpen(!isOpen)} />
      } color={(isOpen) ? 'white' : "#3A4874"} />

      <div className="fixed z-20">
        <div className={navDrawerClass}>
          <NavDrawerLink to="/" icon={<MdHome className="w-8 h-8" />} text="Today's habits" onClick={() => setIsOpen(false)} />
          <NavDrawerLink to="/habits" icon={<MdCheckCircle className="w-8 h-8" />} text="Your habits" onClick={() => setIsOpen(false)} />
          <NavDrawerLink to="/progress" icon={<MdBarChart className="w-8 h-8" />} text="Progress" onClick={() => setIsOpen(false)} />
          <NavDrawerLink to="/goals" icon={<FiTarget className="w-8 h-8" />} text="Goals" onClick={() => setIsOpen(false)} />
        </div>

        <div className={darkeningAreaClass} onClick={() => setIsOpen(false)}></div>
      </div>
    </>
  );
}

export default NavDrawer;
