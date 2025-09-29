import type { PropsWithChildren } from 'react';

interface CardProps {
  title?: string;
}

function Card({ title, children }: PropsWithChildren<CardProps>) {
  return (
    <div className='card w-full bg-base-200 shadow-md space-y-6'>
      <div className='card-body'>
        {title && <h2 className='card-title'>{title}</h2>}
        {children}
      </div>
    </div>
  );
}

export default Card;
