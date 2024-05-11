import { Play } from "@phosphor-icons/react";

import {
  CountdownRender,
  FormRender,
  HomeRender,
  MinutesCountdownInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from "./styles";

export function Home() {
  return (
    <HomeRender>
      <form action="">
        <FormRender>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
          />

          <datalist id="task-suggestions">
            <option value="Estudar programação" />
            <option value="Codar um projeto" />
            <option value="" />
            <option value="" />
            <option value="" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesCountdownInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
          />

          <span>minutos.</span>
        </FormRender>

        <CountdownRender>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownRender>

        <StartCountdownButton type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeRender>
  );
}