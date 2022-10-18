import { useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';

interface ItemProps {
  imageUrl: string;
  title: string;
}

const Item: React.FC<ItemProps> = ({ imageUrl, title }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <a className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <Image
          src={imageUrl}
          alt="Placeholder"
          layout="fill"
          objectFit="cover"
          className={cn(
            'duration-700 ease-in-out group-hover:opacity-75',
            isLoading
              ? 'scale-110 blur-2xl grayscale'
              : 'scale-100 blur-0 grayscale-0'
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
    </a>
  );
};

export default Item;
