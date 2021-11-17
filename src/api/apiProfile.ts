import axios from "axios";
import { API } from "@/constants";
import { IProfile, IProfileResponse } from "@/types";

async function changeProfileInfoService(sendData: IProfile): Promise<IProfileResponse> {
  try {
    const { changeProfileInfo } = API;
    const res = await axios.post(changeProfileInfo, sendData);
    return res;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const { data, status } = error.response;
    return { data, status };
  }
}

export default changeProfileInfoService;
