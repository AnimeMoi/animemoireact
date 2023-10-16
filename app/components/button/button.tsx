import { ButtonProps } from "../../types/App";

export const ButtonPrimary = ({ text, func }: ButtonProps): JSX.Element => {
  return (
    <div
      className="scale-up flex px-[12px] py-[8px] rounded-full border-[1.5px] border-white/20 cursor-pointer"
      onClick={func}
    >
      <p className="text-xs text-lightGray font-semibold">{text}</p>
    </div>
  );
};

export const ButtonSuccess = ({ text, func }: ButtonProps): JSX.Element => {
  return (
    <div className="w-full h-fit flex">
      <div
        className="flex px-[15px] py-[10px] bg-success rounded-full cursor-pointer move-up"
        onClick={func}
      >
        <p className="text-[13px] text-white font-semibold">{text}</p>
      </div>
    </div>
  );
};

export const ButtonWarning = ({ text, func }: ButtonProps): JSX.Element => {
  return (
    <div className="w-full h-fit flex">
      <div
        className="flex px-[15px] py-[10px] bg-warning rounded-full cursor-pointer move-up"
        onClick={func}
      >
        <p className="text-[13px] text-white font-semibold">{text}</p>
      </div>
    </div>
  );
};
