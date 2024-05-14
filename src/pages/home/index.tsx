import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

const newCycleFormSchema = z.object({
  task: z.string().min(1, "Informe a tarefa"),
  minutesAmount: z
    .number()
    .min(5, { message: "O ciclo precisa ser de no mínimo 5 minutos" })
    .max(60, { message: "O ciclo precisa ser de no máximo 60 minutos" }),
});

type newCycleFormData = z.infer<typeof newCycleFormSchema>;

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  function handleCreateNewCycle(data: newCycleFormData) {
    console.log(data);
    reset();
  }

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeRender>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormRender>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register("task")}
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
            {...register("minutesAmount", { valueAsNumber: true })}
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

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeRender>
  );
}
