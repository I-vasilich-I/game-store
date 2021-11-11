import { createContext } from "react";
import { IUserContext } from "@/types";

const UserContext = createContext<IUserContext>({ userName: null, setUserName: null });

export default UserContext;
