import { ReactNode } from "react";
import styled from "styled-components";
import ContainerTitle from "../containerTitle/containerTitle";

interface IProps {
  title: string;
  center?: boolean;
  children?: ReactNode;
}

const StyledContainer = styled.div`
  width: 100%;
  padding: 25px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
`;

const Container: React.FC<IProps> = ({ title, center, children }) => (
  <StyledContainer>
    <ContainerTitle title={title} center={center} />
    {children}
  </StyledContainer>
);

export default Container;
