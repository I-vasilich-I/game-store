const THead = (): JSX.Element => {
  const heads = ["Name", "Platform", "Order date", "Amount", "Price ($)", " "];

  return (
    <thead className="table__thead">
      <tr>
        {heads.map((elem, id) => (
          // eslint-disable-next-line react/no-array-index-key
          <th key={id} className="thead">
            {elem}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default THead;
