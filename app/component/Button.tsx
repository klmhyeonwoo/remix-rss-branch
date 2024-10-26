import {css} from "@emotion/react";
import {ButtonHTMLAttributes, PropsWithChildren} from "react";
import Loading from "~/component/Loading";

type ButtonProps = {
    loading?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "types">
export default function Button({ loading, props, children }: PropsWithChildren<ButtonProps>) {
    return (
        <button
        css={css`
        width: 100%;
        padding: 1.5rem 1rem 1.5rem 1rem;
        border-radius: .9rem;
        border: none;
        background: #333333;
        color: white;

        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        min-height: 3.25rem;
      `}
            {...props}
        >
            {loading ? <Loading /> : children}
        </button>
    )
}