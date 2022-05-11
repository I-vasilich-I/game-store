/* eslint-disable jsx-a11y/label-has-associated-control */
import { useDispatch } from "react-redux";
import useAppSelector from "@/redux/hooks/useAppSelector";
import { setAuthFormType } from "@/redux/store/form/formSlice";
import { openModal } from "@/redux/store/modal/modalSlice";
import { changeProfilePhoto } from "@/redux/thunk/profileThunk/profileThunk";
import { AppDispatch } from "@/redux/store/store";
import userSVG from "images/account_circle.svg";
import Spinner from "@/elements/spinner/spinner";

const ProfilePhoto = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { email, photo } = useAppSelector((state) => state.USER);
  const { isPhotoLoading } = useAppSelector((state) => state.FORM);
  const onImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length && email) {
      dispatch(changeProfilePhoto({ email, photo: e.target.files[0] }));
    }
  };

  const handleClick = () => {
    dispatch(openModal());
    dispatch(setAuthFormType("password"));
  };

  return (
    <div className="photo__container">
      <img src={photo || userSVG} alt="avatar" />
      <input className="photo-input" type="file" name="photo" id="photo" onChange={onImageSelect} />
      <label htmlFor="photo" className="photo-btn">
        Change profile photo
        <Spinner isOn={isPhotoLoading} />
      </label>
      <button type="button" className="photo-btn" onClick={handleClick}>
        Change password
      </button>
    </div>
  );
};

export default ProfilePhoto;
