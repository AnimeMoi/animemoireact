import { ButtonProps } from "../../types/App";

export const ButtonPrimary = ({ text, func }: ButtonProps): JSX.Element => {
  return (
    <div
      className="scale-in w-fit h-fit px-[15px] py-[10px] bg-lightGray rounded-full cursor-pointer"
      onClick={func}
    >
      <p className="text-[13px] text-black font-semibold">{text}</p>
    </div>
  );
};

export const ButtonSuccess = ({ text, func }: ButtonProps): JSX.Element => {
  return (
    <div
      className="flex px-[15px] py-[10px] bg-success rounded-full cursor-pointer move-up"
      onClick={func}
    >
      <p className="text-[13px] text-white font-semibold">{text}</p>
    </div>
  );
};

export const ButtonWarning = ({ text, func }: ButtonProps): JSX.Element => {
  return (
    <div
      className="flex px-[15px] py-[10px] bg-warning rounded-full cursor-pointer move-up"
      onClick={func}
    >
      <p className="text-[13px] text-white font-semibold">{text}</p>
    </div>
  );
};
