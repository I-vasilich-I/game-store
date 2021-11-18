/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import axios from "axios";
import { API } from "@/constants";
import { IProfile, IProfileResponse } from "@/types";

interface IProps {
  email: string;
  photo: string;
}

interface IPasswordProps {
  email: string;
  password: string;
}

async function changeProfileInfoService(sendData: IProfile): Promise<IProfileResponse> {
  try {
    const { changeProfileInfo } = API;
    const res = await axios.post(changeProfileInfo, sendData);
    return res;
  } catch (error: any) {
    const { data, status } = error.response;
    return { data, status };
  }
}

async function uploadPhoto(image: File): Promise<string> {
  console.log(image);
  try {
    const { photoUploadURL } = API;
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "avatar");
    const {
      data: { secure_url },
    } = await axios.post(photoUploadURL, formData);
    return secure_url;
  } catch (error) {
    console.error(error);
  }
  return "";
}

async function changeProfilePhotoService(sendData: IProps): Promise<IProfileResponse> {
  try {
    const { changeProfilePhoto } = API;
    const res = await axios.post(changeProfilePhoto, sendData);
    return res;
  } catch (error: any) {
    const { data, status } = error.response;
    return { data, status };
  }
}

async function changePasswordService(sendData: IPasswordProps): Promise<IProfileResponse> {
  try {
    const { changePasswordURL } = API;
    const res = await axios.post(changePasswordURL, sendData);
    return res;
  } catch (error: any) {
    const { data, status } = error.response;
    return { data, status };
  }
}

export { changeProfileInfoService, uploadPhoto, changeProfilePhotoService, changePasswordService };
