import {css} from "@emotion/react";

export default function Button({ props, children }) {
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
            {children}
        </button>
    )
}