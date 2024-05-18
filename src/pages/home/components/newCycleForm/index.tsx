import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { FormRender, MinutesCountdownInput, TaskInput } from "./styles";

const newCycleFormSchema = z.object({
  task: z.string().min(1, "Informe a tarefa"),
  minutesAmount: z
    .number()
    .min(5, { message: "O ciclo precisa ser de no mínimo 5 minutos" })
    .max(60, { message: "O ciclo precisa ser de no máximo 60 minutos" }),
});

type newCycleFormData = z.infer<typeof newCycleFormSchema>;

export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

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
