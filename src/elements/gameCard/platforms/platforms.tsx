import "./platforms.scss";
import PS from "images/PlayStation_logo.svg";
import PC from "images/windows_logo.svg";
import XBox from "images/Xbox_one_logo.svg";

interface IImages {
  [name: string]: string;
}

interface IProps {
  platform: string[] | undefined;
}

const img: IImages = {
  PC,
  PS,
  XBox,
};

const Platforms = ({ platform }: IProps): JSX.Element | null =>
  platform ? (
    <div className="game-platforms">
      {platform?.map((el, id) => (
        // eslint-disable-next-line react/no-array-index-key
        <img src={img[el]} alt={el} key={id} />
      ))}
    </div>
  ) : null;

export default Platforms;
