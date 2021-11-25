import ContainerTitle from "@/elements/containerTitle/containerTitle";

const SortSection = (): JSX.Element => (
  <>
    <ContainerTitle title="Sort" />
    <fieldset id="sort">
      <label htmlFor="criteria" className="sort__label">
        Criteria
        <select name="criteria" id="criteria">
          <option value="name" selected>
            Name
          </option>
          <option value="rating">Rating</option>
          <option value="price">Price</option>
        </select>
      </label>
      <label htmlFor="type" className="sort__label">
        Type
        <select name="type" id="type">
          <option value="ascend" selected>
            Ascending
          </option>
          <option value="descend">Descending</option>
        </select>
      </label>
    </fieldset>
  </>
);

export default SortSection;
