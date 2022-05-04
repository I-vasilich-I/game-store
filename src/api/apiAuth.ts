import axios from "axios";
import { IUser } from "@/types";

interface IProps {
  sendData: IUser;
  url: string;
}

async function authenticate({ url, sendData }: IProps) {
  try {
    const res = await axios.post(url, sendData);
    const { data, status } = res;
    return { data, status };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const { data, status } = error.response;
    return { data, status };
  }
}

export default authenticate;
