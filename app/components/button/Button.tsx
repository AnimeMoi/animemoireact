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
