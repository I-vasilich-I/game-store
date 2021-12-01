import RemoveButton from "./removeButton/removeButton";

const TFoot = (): JSX.Element => {
  const columnsAmount = 6;

  return (
    <tfoot>
      <tr>
        <td colSpan={columnsAmount - 1} />
        <td>
          <RemoveButton />
        </td>
      </tr>
    </tfoot>
  );
};

export default TFoot;
