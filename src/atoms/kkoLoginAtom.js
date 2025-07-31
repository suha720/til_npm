import { atom } from "recoil";

export const kkoLoginAtom = atom({
  key: "kkoLoginAtom",
  default: {
    id: "",
    nickname: "",
    thumbnail_image_url: "",
    email: "",
  },
});
