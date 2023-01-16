import { atom, useAtom } from "jotai";

const userNameAtom = atom<string>("");
const confirmAlartAtom = atom<boolean>(false);

export const closeConfirmAlart = atom(
  (get) => get(confirmAlartAtom),
  (get, set, setTime) => set(confirmAlartAtom, get(confirmAlartAtom) == setTime)
);

// export const confirmAlart = atom(() => {
//   const [alart, setAlart] = useAtom(closeConfirmAlart);
//   setAlart(true);
//   setTimeout(() => {
//     setAlart(false);
//   }, 5000);
// });

export const alart = (alart: boolean) => {
  alart == true;
  setTimeout(() => {
    alart == false;
  }, 5000);
};
