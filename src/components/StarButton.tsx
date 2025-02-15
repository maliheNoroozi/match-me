"use cl";

import { Button } from "@nextui-org/react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { PiSpinnerGap } from "react-icons/pi";

interface Props {
  loading: boolean;
  selected: boolean;
  clickHandler?: () => void;
}

export function StarButton({ loading, selected, clickHandler }: Props) {
  return (
    <button
      aria-label="star button"
      onClick={clickHandler}
      className="fill-yellow-500 absolute top-3 left-3 z-50 size-7 cursor-pointer hover:opacity-80 transition"
    >
      <div className="relative">
        {!loading ? (
          <>
            <AiOutlineStar
              size={32}
              className="fill-white absolute -top-[2px] -right-[2px]"
            />
            <AiFillStar
              size={28}
              className={selected ? "fill-yellow-200" : "fill-neutral-500/70"}
            />
          </>
        ) : (
          <PiSpinnerGap size={32} className="fill-white animate-spin" />
        )}
      </div>
    </button>
  );
}
