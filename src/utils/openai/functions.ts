import { createClient } from "../supabase/client";
import fs from "fs";
import path from "path";

async function getOrgConfig() {
  const filePath = path.join(process.cwd(), "org.config.json");
  const fileContents = await fs.promises.readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}

const supabase = createClient();

export interface TrainingMaterialSearchArgs {
  contains?: string;
}

export interface TrainingMaterialSearchResult {
  title: string;
  description: string;
  duration_minutes: number;
  level: string;
  link: string;
}

export async function searchTrainingMaterials(
  args: TrainingMaterialSearchArgs
) {
  const org = await getOrgConfig();
  const res = org.resources["training_materials"];
  const defaultData: TrainingMaterialSearchResult = {
    title: "",
    description: "",
    level: "Beginner",
    duration_minutes: 100,
    link: `${res.url}/404`,
  };
  const { data } = await supabase
    .from("training_materials")
    .select()
  return data?.map((d) => ({
    ...defaultData,
    ...d,
    link: `${res.url}/${d.id}`,
  }));
}

export interface EmployeeSearchArgs {
  groups?: string[];
  department?: string;
  role?: string;
}

export interface EmployeeSearchResult {
  full_name: string;
  department: string;
  role: string;
  email: string;
  link: string;
}
export async function searchEmployee(
  args: EmployeeSearchArgs
) {
  const org = await getOrgConfig();
  const res = org.resources["employee_profiles"];
  const { data } = await supabase
    .from("employee_profiles")
    .select()
  return data?.map((d) => ({
    ...d,
    link: `${res.url}/${d.id}`,
  }));
}

export interface EventSearchArgs {
  contains?: string;
}

export interface EventSearchResult {
  title: string;
  description: string;
  link: string;
}
export async function searchEvents(
  args: EventSearchArgs
): Promise<EventSearchResult[]> {
  return [];
}

export interface AnnouncementSearchArgs {
  contains?: string;
}

export interface AnnouncementSearchResult {
  title: string;
  description: string;
  link: string;
}
export async function searchAnnouncements(
  args: AnnouncementSearchArgs
): Promise<AnnouncementSearchResult[]> {
  return [];
}
