import { css } from "styled-components";

// MOBILE 450px
export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 450px) {
      ${props}
    }
  `;
};
