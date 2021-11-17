import { useEffect, useState } from "react";
import useAppSelector from "@/redux/hooks/useAppSelector";
import { IInputProps } from "@/types";
import { VALIDATION_MESSAGES } from "@/constants";
import { validateValue } from "@/helpers";
import InputText from "@/elements/inputText/inputText";
import Spinner from "@/elements/spinner/spinner";

const ProfileInfo = (): JSX.Element => {
  const { textMessage, emailMessage, mobilePhone, addressMessage } = VALIDATION_MESSAGES;
  const { userName, email } = useAppSelector((state) => state.USER);
  const { isLoading } = useAppSelector((state) => state.FORM);
  const isValidInitialState = {
    user: validateValue(userName as string, "text"),
    email: validateValue(email as string, "email"),
    address: false,
    phone: false,
  };
  const [inputUserName, setInputUserName] = useState<string>(userName || "");
  const [inputEmail, setInputEmail] = useState<string>(email || "");
  const [inputAddress, setInputAddress] = useState<string>("");
  const [inputPhone, setInputPhone] = useState<string>("");
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
      isValid: isValid.address,
      message: addressMessage,
    },
    {
      type: "tel",
      id: "phone",
      required: true,
      title: "Phone",
      setValue: setInputPhone,
      isValid: isValid.phone,
      message: mobilePhone,
    },
  ];

  const isValidToSubmit = Object.values(isValid).reduce((a, b) => a + +b, 0) === formContent.length;

  useEffect(() => {
    const isValidChangedState = {
      user: validateValue(inputUserName, "text"),
      email: validateValue(inputEmail, "email"),
      address: Boolean(inputAddress),
      phone: validateValue(inputPhone, "tel"),
    };
    setIsValid(isValidChangedState);
  }, [inputUserName, inputEmail, inputAddress, inputPhone]);

  return (
    <div className="info__container">
      {formContent.map((el) => (
        <InputText key={el.id} {...el} />
      ))}
      <button type="submit" className="submit-btn" disabled={!isValidToSubmit || isLoading}>
        Save
        <Spinner isOn={isLoading} />
      </button>
    </div>
  );
};

export default ProfileInfo;
