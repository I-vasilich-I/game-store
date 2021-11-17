/* eslint-disable jsx-a11y/label-has-associated-control */
import userSVG from "images/account_circle.svg";

const ProfilePhoto = (): JSX.Element => {
  const onImageSelect = () => {
    console.log("change photo");
  };

  const handleClick = () => {
    console.log("change password");
  };

  return (
    <div className="photo__container">
      <img src={userSVG} alt="avatar" />
      <input className="photo-input" type="file" name="photo" id="photo" onChange={onImageSelect} />
      <label htmlFor="photo" className="photo-btn">
        Change profile photo
      </label>
      <button type="button" className="photo-btn" onClick={handleClick}>
        Change password
      </button>
    </div>
  );
};

export default ProfilePhoto;
