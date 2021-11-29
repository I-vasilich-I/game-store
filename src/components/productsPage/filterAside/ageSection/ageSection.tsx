import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { setAge } from "@/redux/store/products/productsSlice";
import ContainerTitle from "@/elements/containerTitle/containerTitle";
import InputRadioOptions from "@/elements/inputRadioOptions/inputRadioOptions";

const AgeSection = (): JSX.Element => {
  const dispatch = useDispatch();
  const [age, setAgeLocal] = useState(0);
  const options = [
    {
      id: "all-ages",
      value: 0,
      checked: true,
      label: "All ages",
      name: "age",
    },
    {
      id: "age-3",
      value: 3,
      checked: false,
      label: "3+",
      name: "age",
    },
    {
      id: "age-6",
      value: 6,
      checked: false,
      label: "6+",
      name: "age",
    },
    {
      id: "age-12",
      value: 12,
      checked: false,
      label: "12+",
      name: "age",
    },
    {
      id: "age-18",
      value: 18,
      checked: false,
      label: "18+",
      name: "age",
    },
  ];

  const debouncedSetAge = useCallback(debounce(setAgeLocal, 300), []);

  useEffect(() => {
    dispatch(setAge(age));
  }, [age]);

  return (
    <>
      <ContainerTitle title="Age" />
      <fieldset id="age">
        <InputRadioOptions options={options} setValue={debouncedSetAge} />
      </fieldset>
    </>
  );
};

export default AgeSection;
