"use client";

import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";
import { PiSpinnerGap } from "react-icons/pi";

interface Props {
  loading: boolean;
  clickHandler?: () => void;
}

export function DeleteButton({ loading, clickHandler }: Props) {
  return (
    <button
      aria-label="delete button"
      onClick={clickHandler}
      className="fill-red-500 absolute top-3 right-3 z-50 size-7 cursor-pointer hover:opacity-80 transition"
    >
      <div className="relative">
        {!loading ? (
          <>
            <AiOutlineDelete
              size={32}
              className="fill-white absolute -top-[2px] -right-[2px]"
            />
            <AiFillDelete size={28} className="fill-red-600" />
          </>
        ) : (
          <PiSpinnerGap size={32} className="fill-white animate-spin" />
        )}
      </div>
    </button>
  );
}
