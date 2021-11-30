import "./cartPage.scss";
import useAppSelector from "@/redux/hooks/useAppSelector";
import Container from "@/elements/container/container";
import THead from "./thead/thead";
import TRow from "./tRow/tRow";

const CartPage = (): JSX.Element => {
  const { products } = useAppSelector((state) => state.CART);
  const games = Object.values(products);
  const totalCost = games.reduce((acc, b) => acc + +(b.game.price || 0) * b.amount, 0).toFixed(2);
  const balance = 50;

  return (
    <div className="wrapper wrapper__cart">
      <section className="section__cart">
        <Container title="Cart page">
          <div className="table__wrapper">
            <table className="cart__table">
              <THead />
              <tbody>
                {games.map(({ game, amount }) => (
                  <TRow key={game.id} game={game} amount={amount} />
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={5} />
                  <td>
                    <button type="button" className="cart-btn">
                      Remove
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="cart__control">
            <span>Games cost: {totalCost} $</span>
            <span>Your balance: {balance} $</span>
            <button type="button" className="cart-btn">
              Buy
            </button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default CartPage;
