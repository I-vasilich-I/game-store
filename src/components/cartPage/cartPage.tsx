import "./cartPage.scss";
import useAppSelector from "@/redux/hooks/useAppSelector";
import Container from "@/elements/container/container";
import Table from "./table/table";
import CartControl from "./cartControl/cartControl";

const CartPage = (): JSX.Element => {
  const { products } = useAppSelector((state) => state.CART);
  const games = Object.values(products);

  return (
    <div className="wrapper wrapper__cart">
      <section className="section__cart">
        <Container title="Cart page">
          <Table games={games} />
          <CartControl games={games} />
        </Container>
      </section>
    </div>
  );
};

export default CartPage;
