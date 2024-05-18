import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { differenceInSeconds } from "date-fns";

import { HandPalm, Play } from "@phosphor-icons/react";

import {
  CountdownRender,
  FormRender,
  HomeRender,
  MinutesCountdownInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
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

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  const task = watch("task");
  const isSubmitDisabled = !task;

  function handleCreateNewCycle(data: newCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);

    setActiveCycleId(newCycle.id);
    setAmountSecondsPassed(0);

    reset();
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id == activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );

    setActiveCycleId(null);
  }

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id == activeCycleId) {
                return { ...cycle, finishedDate: new Date() };
              } else {
                return cycle;
              }
            })
          );

          setAmountSecondsPassed(totalSeconds);

          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, activeCycleId]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <HomeRender>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
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

        <CountdownRender>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownRender>

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
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
