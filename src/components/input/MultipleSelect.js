import { useState, useEffect, useRef } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdCheck } from 'react-icons/md';
import classNames from 'classnames';

function MultipleSelect({ className, value, onChange, options, icon, label }) {
  const [isOpen, setIsOpen] = useState(null);
  const selectEl = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (selectEl.current === null || !isOpen) return;
      if (!selectEl.current.contains(event.target)) setIsOpen(false);
    }
    document.addEventListener('click', handleClick, true);

    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  const renderedOptions = options.map((option) => {
    const optionClass = classNames(
      'relative', '-z-10', 'flex', 'space-x-2', 'px-4', 'py-2', 'border-neutral-3', 'border-b-[1.5px]',
      'duration-200', 'first:rounded-t-xl', 'last:rounded-b-xl', 'last:border-b-0',
      { 'bg-neutral-2-brighter': value.includes(option), 'bg-neutral-2': !value.includes(option) }
    );

    return (
      <div key={option} className={optionClass} onClick={() => onChange(option)}>
        <p className="grow">{option}</p>
        {(value.includes(option)) && <MdCheck className="w-6 h-6 animate-slide-down" />}
      </div>
    );
  }
  );

  const selectClass = classNames('relative', className);
  const currentValueClass = classNames(
    'flex', 'justify-between', 'space-x-2', 'mb-2', 'px-4', 'py-2', 'bg-neutral-2',
    'rounded-full', 'shadow-md', 'shadow-neutral-3', 'animate-slide-down', 'duration-200',
    { 'bg-neutral-2-brighter': isOpen });

  const arrowClass = classNames('w-6', 'h-6',
    { 'animate-flip-select-arrow': isOpen, 'animate-flip-select-arrow-back': isOpen === false });

  const optionsClass = classNames('absolute', 'z-10', 'w-full', 'rounded-xl', 'origin-top', 'shadow-md', 'shadow-neutral-3',
    { 'animate-open-select': isOpen, 'animate-close-select': isOpen === false, 'hidden': isOpen === null });

  return (
    <div className={selectClass} ref={selectEl}>
      <div className={currentValueClass} onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center space-x-2">
          {icon}
          <p className="font-bold">{label}</p>
        </div>
        <MdKeyboardArrowDown className={arrowClass} />
      </div>

      <div className={optionsClass}>
        {renderedOptions}
      </div>
    </div>
  );
}

export default MultipleSelect;
