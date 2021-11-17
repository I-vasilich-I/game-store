import "./profilePage.scss";
import { FormEvent } from "react";
import useAppSelector from "@/redux/hooks/useAppSelector";
import Container from "@/elements/container/container";
import ProfilePhoto from "./profilePhoto/profilePhoto";
import ProfileInfo from "./profileInfo/profileInfo";

const ProfilePage = (): JSX.Element => {
  const { userName } = useAppSelector((state) => state.USER);
  const containerTitle = `${userName}'s profile page`;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };

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
    </div>
  );
};

export default ProfilePage;
