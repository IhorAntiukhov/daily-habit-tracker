import classNames from 'classnames';

function SeparatedInput({ value, onChange, label }) {
  const handleInput = (event, input) => {
    if (String(event.target.value).length <= 2) {
      onChange({ input, text: event.target.value });
    }
  }

  console.log(value)

  const inputWrapperClass = classNames(
    'flex', 'flex-col', 'justify-between', 'space-y-0', 'mb-1', 'px-4', 'py-2', 'bg-neutral-2', 'rounded-2xl',
    'border-2', 'border-[transparent]', 'shadow-md', 'shadow-neutral-3', 'animate-slide-down', 'duration-200',
    'focus-within:bg-neutral-2-brighter', 'focus-within:border-accent', 'focus-within:shadow-accent');

  const inputClass = classNames(
    'w-5', 'text-center', 'bg-[transparent]', 'outline-none', 'border-b-2', 'border-neutral-3',
    'duration-200', 'focus:border-accent', 'placeholder:text-neutral-3');

  return (
    <div className={inputWrapperClass}>
      <p className="text-sm whitespace-nowrap text-neutral-3">{label}</p>
      <div className="flex space-x-2">
        <input className={inputClass} value={value.slice(0, value.indexOf(':'))} placeholder="00" onInput={(event) => handleInput(event, 'hours')} />
        <input className={inputClass} value={value.slice(value.indexOf(':') + 1)} placeholder="00" onInput={(event) => handleInput(event, 'minutes')} />
      </div>
    </div>
  );
}

export default SeparatedInput;
