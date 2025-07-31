import { atom } from "recoil";

export const counerAtom = atom({
  key: "counerAtom", // state 를 구분하는 역할
  default: 0, // state 의 초기값
});
