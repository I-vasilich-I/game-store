import "./gameCardSkeleton.scss";

const GameCardSkeleton = (): JSX.Element => (
  <div className="card__container skeleton">
    <div className="card">
      <div className="card__face">
        <div className="card__cover" />
        <div className="card__body">
          <div className="card__title">
            <p />
            <span />
          </div>
          <div className="rating__container" />
        </div>
      </div>
    </div>
  </div>
);

export default GameCardSkeleton;
