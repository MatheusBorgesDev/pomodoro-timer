import { Scroll, Timer } from "@phosphor-icons/react";

import logo from "../../assets/Logo.svg";

import { HeaderRender } from "./styles";
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <HeaderRender>
      <img src={logo} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>

        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderRender>
  );
}
