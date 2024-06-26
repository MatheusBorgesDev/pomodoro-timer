import styled from "styled-components";

export const CountdownRender = styled.div`
  font-family: "Roboto Mono", monospace;
  font-size: 10rem;
  font-weight: bold;
  line-height: 8rem;
  color: ${(props) => props.theme["gray-100"]};

  display: flex;
  gap: 1rem;

  span {
    background: ${(props) => props.theme["gray-700"]};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`;

export const Separator = styled.div`
  padding: 2rem 0;
  overflow: hidden;
  width: 4rem;

  color: ${(props) => props.theme["green-500"]};

  display: flex;
  justify-content: center;
  text-align: center;

  font-family: "Roboto", sans-serif;
  font-weight: bold;
`;
