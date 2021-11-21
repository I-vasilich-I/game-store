/* eslint-disable jsx-a11y/label-has-associated-control */
import Spinner from "@/elements/spinner/spinner";
import useAppSelector from "@/redux/hooks/useAppSelector";
import SAGA_ACTIONS from "@/redux/sagas/sagaActions/sagaActions";
import { setAuthFormType } from "@/redux/store/form/formSlice";
import { openModal } from "@/redux/store/modal/modalSlice";
import userSVG from "images/account_circle.svg";
import { useDispatch } from "react-redux";

const ProfilePhoto = (): JSX.Element => {
  const dispatch = useDispatch();
  const { email, photo } = useAppSelector((state) => state.USER);
  const { isPhotoLoading } = useAppSelector((state) => state.FORM);
  const onImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      dispatch({
        type: SAGA_ACTIONS.PROFILE_CHANGE_PHOTO,
        payload: { email, photo: e.target.files[0] },
      });
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
