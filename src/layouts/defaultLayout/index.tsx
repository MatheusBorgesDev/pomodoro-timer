import { Outlet } from "react-router-dom";

import { DefaultLayoutRender } from "./styles";

import { Header } from "../../components/header";

export function DefaultLayout() {
  return (
    <DefaultLayoutRender>
      <Header />
      <Outlet />
    </DefaultLayoutRender>
  );
}
