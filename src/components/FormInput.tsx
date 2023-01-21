import { useAtom } from "jotai";
import React, { memo, useState } from "react";

const FormInput = memo(({ labelTitle }: any) => {
  const [text, setText] = useState("");
  const [invalidText, setInvalidText] = useState("");
  console.log("FormInputがレンダリングされました");

  return (
    <>
      <div className="form-control">
        <label className="label">
          <span className="label-text">{labelTitle}</span>
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input input-bordered"
        />
        {invalidText && (
          <p className="text-red-600 text-sm md:text-sm mt-2">{invalidText}</p>
        )}
      </div>
    </>
  );
});

export default FormInput;
function setTextAtom(setTextAtom: any): [any, any] {
  throw new Error("Function not implemented.");
}
