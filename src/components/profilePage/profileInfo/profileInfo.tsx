import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useAppSelector from "@/redux/hooks/useAppSelector";
import SAGA_ACTIONS from "@/redux/sagas/sagaActions/sagaActions";
import { IInputProps } from "@/types";
import { VALIDATION_MESSAGES } from "@/constants";
import { validateValue } from "@/helpers";
import InputText from "@/elements/inputText/inputText";
import Spinner from "@/elements/spinner/spinner";
import ValidationMessage from "@/elements/validationMessage/validationMessage";

const ProfileInfo = (): JSX.Element => {
  const dispatch = useDispatch();
  const { textMessage, emailMessage, mobilePhone, addressMessage } = VALIDATION_MESSAGES;
  const { userName, email, address, phone } = useAppSelector((state) => state.USER);
  const { isSaving } = useAppSelector((state) => state.FORM);
  const isValidInitialState = {
    user: validateValue(userName || "", "text"),
    email: validateValue(email || "", "email"),
    address: Boolean(address),
    phone: validateValue(phone || "", "tel"),
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
      required: false,
      title: "Delivery address",
      setValue: setInputAddress,
      value: inputAddress,
      isValid: true,
      message: addressMessage,
    },
    {
      type: "tel",
      id: "phone",
      required: false,
      title: "Phone",
      setValue: setInputPhone,
      value: inputPhone,
      isValid: isValid.phone,
      message: mobilePhone,
    },
  ];

  const isValidFields = isValid.email && isValid.user && (inputPhone === "" || isValid.phone);
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
      address: true,
      phone: inputPhone === "" ? true : validateValue(inputPhone, "tel"),
    };
    setIsValid(isValidChangedState);
  }, [inputUserName, inputEmail, inputAddress, inputPhone]);

  return (
    <div className="info__container">
      {formContent.map((el) => (
        <InputText key={el.id} {...el} />
      ))}
      <button type="button" className="submit-btn" disabled={!isValidToSubmit || isSaving} onClick={handleClick}>
        Save
        <Spinner isOn={isSaving} />
      </button>
      <ValidationMessage isValid={hasChangedFields} message={changeInfo} />
    </div>
  );
};

export default memo(ProfileInfo);
