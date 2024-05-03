import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/theme/default";

import { Button } from "./components/button";

export function App() {
  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Button variant="primary" />
        <Button variant="secondary" />
        <Button variant="success" />
        <Button variant="danger" />
        <Button />
        <GlobalStyle />
      </ThemeProvider>
    </div>
  );
}
