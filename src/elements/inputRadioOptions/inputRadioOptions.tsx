import { IInputRadioOptionsProps } from "@/types";
import InputRadioOption from "../inputRadioOption/inputRadioOption";

const InputRadioOptions = ({ options, setValue }: IInputRadioOptionsProps): JSX.Element => (
  <>
    {options.map((elem) => (
      <InputRadioOption {...elem} key={elem.id} setValue={setValue} />
    ))}
  </>
);

export default InputRadioOptions;
