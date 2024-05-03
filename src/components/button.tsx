import { ButtonRender, buttonVariant } from "./button.styles";

interface ButtonProps {
  variant?: buttonVariant;
}

export function Button({ variant = "primary" }: ButtonProps) {
  return <ButtonRender variant={variant}>Enviar</ButtonRender>;
}
