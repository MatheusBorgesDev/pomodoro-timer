import styled from "styled-components";

export type buttonVariant = "primary" | "secondary" | "danger" | "success";

interface ButtonRenderProps {
  variant: buttonVariant;
}

export const ButtonRender = styled.button<ButtonRenderProps>`
  width: 100px;
  height: 40px;
  border-radius: 4px;
  border: 0;
  margin: 8px;

  background: ${(props) => props.theme.white};
`;
