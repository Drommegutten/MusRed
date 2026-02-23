import type { Medlem } from "../../interfaces/medlemmer";
import type { Program } from "../../interfaces/programmer";
import  { MEDLEM_QUERY as MedlemmerQuery } from "../../queries/medlemmer";
import { PROGRAMMER_QUERY as ProgrammerQuery } from "../../queries/programmer";
import { client } from "../lib/client";

export const getMedlemmerInfo = async (): Promise<Medlem[]> => {
  return client.fetch<Medlem[]>(MedlemmerQuery);
};

export const getProgrammerInfo = async (): Promise<Program[]> => {
  return client.fetch<Program[]>(ProgrammerQuery);
}

