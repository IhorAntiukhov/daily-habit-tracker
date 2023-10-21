import classNames from 'classnames';

function Button({ className, children, ...rest }) {
  const buttonClass = classNames(
    'relative', 'bottom-0', 'flex', 'justify-center', 'items-center', 'space-x-2', 'px-4', 'py-2',
    'bg-gradient-to-br', 'from-primary-main', 'to-primary-brighter', 'rounded-full', 'shadow-md', 'shadow-neutral-3',
    'animate-slide-down', 'duration-200', 'active:bottom-1.5', className
  );

  return (
    <button className={buttonClass} {...rest}>
      {children}
    </button>
  )
}

export default Button;