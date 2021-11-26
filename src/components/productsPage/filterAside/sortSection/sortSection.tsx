import ContainerTitle from "@/elements/containerTitle/containerTitle";
import CustomSelect from "@/elements/customSelect/customSelect";
import { setSortBy, setType } from "@/redux/store/products/productsSlice";
import { SortByTypes } from "@/types";
import { useDispatch } from "react-redux";

const SortSection = (): JSX.Element => {
  const dispatch = useDispatch();
  const criteriaOptions = ["Name", "Rating", "Price"];
  const typeOptions = ["Ascending", "Descending"];

  const dispatchCriteria = (value: SortByTypes) => {
    dispatch(setSortBy(value));
  };

  const dispatchType = (value: string) => {
    dispatch(setType(value));
  };

  return (
    <>
      <ContainerTitle title="Sort" />
      <fieldset id="sort">
        <CustomSelect options={criteriaOptions} label="Criteria" dispatcher={dispatchCriteria} />
        <CustomSelect options={typeOptions} label="Type" dispatcher={dispatchType} />
      </fieldset>
    </>
  );
};

export default SortSection;
