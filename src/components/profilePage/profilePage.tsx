import "./profilePage.scss";
import { FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import useAppSelector from "@/redux/hooks/useAppSelector";
import { setAlert, setError } from "@/redux/store/modal/modalSlice";
import Container from "@/elements/container/container";
import Alert from "@/elements/alert/alert";
import ProfilePhoto from "./profilePhoto/profilePhoto";
import ProfileInfo from "./profileInfo/profileInfo";

const ProfilePage = (): JSX.Element => {
  const dispatch = useDispatch();
  const { userName } = useAppSelector((state) => state.USER);
  const { error, alert } = useAppSelector((state) => state.MODAL);
  const containerTitle = `${userName}'s profile page`;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };

  useEffect(() => {
    if (!error) {
      return;
    }

    setTimeout(() => {
      dispatch(setError(""));
    }, 10000);
  }, [error]);

  useEffect(() => {
    if (!alert) {
      return;
    }

    setTimeout(() => {
      dispatch(setAlert(""));
    }, 5000);
  }, [alert]);

  return (
    <div className="wrapper wrapper__profile">
      <section className="section__profile">
        <Container title={containerTitle}>
          <form className="profile__form" onSubmit={handleSubmit}>
            <ProfilePhoto />
            <ProfileInfo />
          </form>
        </Container>
      </section>
      {error ? <Alert type="error" message={error} /> : null}
      {alert ? <Alert type="info" message={alert} /> : null}
    </div>
  );
};

export default ProfilePage;
