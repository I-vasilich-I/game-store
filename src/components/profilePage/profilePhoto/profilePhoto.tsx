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
      <label htmlFor="photo" className="photo-btn">
        Change profile photo
        <input className="photo-input" type="file" name="photo" id="photo" onChange={onImageSelect} />
      </label>
      <button type="button" className="photo-btn" onClick={handleClick}>
        Change password
      </button>
    </div>
  );
};

export default ProfilePhoto;
