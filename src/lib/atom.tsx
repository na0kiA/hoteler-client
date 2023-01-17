import { atom, useAtom } from "jotai";

const userNameAtom = atom<string>("");
const confirmAlartAtom = atom<boolean>(false);

// Create your atoms and derivatives
const textAtom = atom<string>("");

// const setTextAtom = atom(
//   (get) => get(textAtom),
//   (get, set, message: string) => set(textAtom, message)
// );

// Use them anywhere in your app
// export const ErrorMessage = (message: string) => {
//   const [text, setText] = useAtom(setTextAtom);
//   setText(message);
//   return <p className="text-red-600 text-sm md:text-sm mt-2">{text}</p>;
// };

// export const isConfirmAlart = atom(
//   (get) => get(confirmAlartAtom),
//   (get, set, bool) => set(confirmAlartAtom, get(confirmAlartAtom) == bool)
// );

// export const confirmAlartToggle = () => {
//   const [alart, setAlart] = useAtom(isConfirmAlart);
//   setAlart(true);
//   setTimeout(() => {
//     setAlart(false);
//   }, 5000);
// };
