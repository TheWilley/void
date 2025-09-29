import { useRef } from 'react';
import type { PropsWithChildren } from 'react';
import { FaInfo } from 'react-icons/fa';

function Helper({ children }: PropsWithChildren) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  return (
    <div>
      <button
        type='button'
        className='btn btn-circle btn-ghost btn-xs bg-base-100 mb-2'
        onClick={openModal}
      >
        <FaInfo />
      </button>

      <dialog ref={modalRef} className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box relative'>
          <form method='dialog'>
            <button
              type='submit'
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
            >
              ✕
            </button>
          </form>
          {children}
        </div>
      </dialog>
    </div>
  );
}

export default Helper;
