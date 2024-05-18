import { useContext } from "react";

import { CyclesContext } from "../../contexts/cyclesContext";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { HandPalm, Play } from "@phosphor-icons/react";

import { NewCycleForm } from "./components/newCycleForm";
import { Countdown } from "./components/countdown";

import {
  HomeRender,
  StartCountdownButton,
  StopCountdownButton,
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
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext);

  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const task = watch("task");
  const isSubmitDisabled = !task;

  function handleCreateNewCycle(data: newCycleFormData) {
    createNewCycle(data);

    reset();
  }

  return (
    <HomeRender>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeRender>
  );
}
