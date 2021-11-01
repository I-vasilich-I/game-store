import "./rating.scss";
// import star from "images/star_rate.svg";

interface IProps {
  rating: number;
}

const Rating = ({ rating }: IProps): JSX.Element => (
  <div className="rating__container">
    {[...Array(5).keys()].map((_, i) => {
      const className = `rating__star${i < rating ? " rating__star--active" : ""}`;
      const star = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#FFFFFF"
          className={className}
          // eslint-disable-next-line react/no-array-index-key
          key={i}
        >
          <g>
            <rect fill="none" height="24" width="24" x="0" />
            <polygon points="14.43,10 12,2 9.57,10 2,10 8.18,14.41 5.83,22 12,17.31 18.18,22 15.83,14.41 22,10" />
          </g>
        </svg>
      );
      return star;
    })}
  </div>
);

export default Rating;
