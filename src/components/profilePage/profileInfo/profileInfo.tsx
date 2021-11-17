import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useAppSelector from "@/redux/hooks/useAppSelector";
import { setAlert } from "@/redux/store/modal/modalSlice";
import SAGA_ACTIONS from "@/redux/sagas/sagaActions/sagaActions";
import { IInputProps } from "@/types";
import { VALIDATION_MESSAGES } from "@/constants";
import { validateValue } from "@/helpers";
import InputText from "@/elements/inputText/inputText";
import Spinner from "@/elements/spinner/spinner";
import Alert from "@/elements/alert/alert";
import ValidationMessage from "@/elements/validationMessage/validationMessage";

const ProfileInfo = (): JSX.Element => {
  const dispatch = useDispatch();
  const { alert } = useAppSelector((state) => state.MODAL);
  const { textMessage, emailMessage, mobilePhone, addressMessage } = VALIDATION_MESSAGES;
  const { userName, email, address, phone } = useAppSelector((state) => state.USER);
  const { isLoading } = useAppSelector((state) => state.FORM);
  const isValidInitialState = {
    user: validateValue(userName as string, "text"),
    email: validateValue(email as string, "email"),
    address: Boolean(address),
    phone: validateValue(phone as string, "tel"),
  };
  const [inputUserName, setInputUserName] = useState<string>(userName || "");
  const [inputEmail, setInputEmail] = useState<string>(email || "");
  const [inputAddress, setInputAddress] = useState<string>(address || "");
  const [inputPhone, setInputPhone] = useState<string>(phone || "");
  const [isValid, setIsValid] = useState(isValidInitialState);

  const formContent: IInputProps[] = [
    {
      type: "text",
      id: "user-name",
      required: true,
      title: "User name",
      setValue: setInputUserName,
      value: inputUserName,
      isValid: isValid.user,
      message: textMessage,
    },
    {
      type: "email",
      id: "email",
      required: true,
      title: "Email",
      setValue: setInputEmail,
      value: inputEmail,
      isValid: isValid.email,
      message: emailMessage,
    },
    {
      type: "text",
      id: "address",
      required: true,
      title: "Delivery address",
      setValue: setInputAddress,
      value: inputAddress,
      isValid: isValid.address,
      message: addressMessage,
    },
    {
      type: "tel",
      id: "phone",
      required: true,
      title: "Phone",
      setValue: setInputPhone,
      value: inputPhone,
      isValid: isValid.phone,
      message: mobilePhone,
    },
  ];

  const isValidFields = Object.values(isValid).reduce((a, b) => a + +b, 0) === formContent.length;
  const hasChangedFields =
    userName !== inputUserName || email !== inputEmail || phone !== inputPhone || address !== inputAddress;
  const isValidToSubmit = isValidFields && hasChangedFields;
  const { changeInfo } = VALIDATION_MESSAGES;

  const handleClick = () => {
    const sendData = {
      name: inputUserName,
      oldEmail: email,
      email: inputEmail,
      address: inputAddress,
      phone: inputPhone,
    };
    dispatch({ type: SAGA_ACTIONS.PROFILE_CHANGE_INFO, payload: sendData });
  };

  useEffect(() => {
    const isValidChangedState = {
      user: validateValue(inputUserName, "text"),
      email: validateValue(inputEmail, "email"),
      address: Boolean(inputAddress),
      phone: validateValue(inputPhone, "tel"),
    };
    setIsValid(isValidChangedState);
  }, [inputUserName, inputEmail, inputAddress, inputPhone]);

  useEffect(() => {
    if (!alert) {
      return;
    }

    setTimeout(() => {
      dispatch(setAlert(""));
    }, 5000);
  }, [alert]);

  return (
    <div className="info__container">
      {formContent.map((el) => (
        <InputText key={el.id} {...el} />
      ))}
      <button type="button" className="submit-btn" disabled={!isValidToSubmit || isLoading} onClick={handleClick}>
        Save
        <Spinner isOn={isLoading} />
      </button>
      {alert ? <Alert type="info" message={alert} /> : null}
      <ValidationMessage isValid={hasChangedFields} message={changeInfo} />
    </div>
  );
};

export default ProfileInfo;
