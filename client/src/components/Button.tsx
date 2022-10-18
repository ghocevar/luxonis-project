import cn from 'classnames';

interface ButtonProps {
  children: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
}) => (
  <button
    onClick={onClick}
    className={cn(
      'bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center',
      disabled && 'cursor-not-allowed'
    )}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
