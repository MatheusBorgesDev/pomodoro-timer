import { useContext } from "react";

import { CyclesContext } from "../../../../contexts/cyclesContext";

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
        <option value="Estudar" />
        <option value="Trabalhar" />
        <option value="Passear" />
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
