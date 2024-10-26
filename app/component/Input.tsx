import {css} from "@emotion/react";
import {InputHTMLAttributes} from "react";
import {DESIGN_SYSTEM_COLOR} from "~/variables";

type InputType = {
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'types'>
export default function Input({ ...props }: InputType) {
    return <input
        css={css`
    color: ${DESIGN_SYSTEM_COLOR.grey700};
    background: transparent;
    width: 100%;
      box-sizing: border-box;
    cursor: default;
      padding: 1.5rem 1rem 1.5rem 2rem;
      border-radius: .9rem;
      border: none;
      box-shadow: inset 0 0 0 1px rgba(0, 27, 55, 0.1);

        &:focus {
          outline: none;
        }
      `}
        {...props}
    />
}