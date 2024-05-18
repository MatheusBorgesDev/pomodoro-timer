import { useContext } from "react";
import { CyclesContext } from "../..";

import { useFormContext } from "react-hook-form";

import { FormRender, MinutesCountdownInput, TaskInput } from "./styles";

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <FormRender>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        type="text"
        list="task-suggestions"
        disabled={!!activeCycle}
        placeholder="Dê um nome para o seu projeto"
        {...register("task")}
      />

      <datalist id="task-suggestions">
        <option value="Estudar programação" />
        <option value="Codar o projeto MarkIt" />
        <option value="Desenvolver site da imobiliária" />
        <option value="" />
        <option value="" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesCountdownInput
        id="minutesAmount"
        type="number"
        disabled={!!activeCycle}
        placeholder="00"
        step={5}
        min={5}
        max={60}
        {...register("minutesAmount", { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormRender>
  );
}
