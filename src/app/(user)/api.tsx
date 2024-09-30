import { createClient } from "@/utils/supabase/client";
import { LearningPathProps, ProfileProps, defaultData } from "./AppContext";
function mockFetchData<T>(data: any, ms = 3000) {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, ms); // Simulate network delay
  });
}
const supabase = createClient();

async function getConfig(): Promise<Record<string, any>> {
  const res = await fetch("/api/config");
  return await res.json();
}

async function getUser() {
  const res = await supabase.auth.getUser();
  return res.data.user;
}

export async function fetchProfile(): Promise<ProfileProps> {
  const user = await getUser();
  return { ...defaultData.profile, ...user?.user_metadata };
}

export async function updateProfile(
  profile: ProfileProps
): Promise<ProfileProps> {
  const { data } = await supabase.auth.updateUser({ data: profile });
  return { ...defaultData.profile, ...data.user?.user_metadata };
}

export async function fetchDepartments(): Promise<string[]> {
  return (await getConfig()).departments;
}

export async function fetchGroups(): Promise<string[]> {
  return (await getConfig()).groups;
}

export async function fetchRoles(): Promise<string[]> {
  return (await getConfig()).roles;
}

export async function genLearningPath(
  goal: string
): Promise<LearningPathProps> {
  const profile = await fetchProfile();
  const res = await fetch("/api/learning_path", {
    method: "POST",
    body: JSON.stringify({ goal, profile }),
  });
  const d = await res.json();
  return { ...defaultData.learning_path, ...d };
}

export async function reGenLearningPath(
  prompt: string,
  l: LearningPathProps
): Promise<LearningPathProps> {
  const profile = await fetchProfile();
  const res = await fetch("/api/learning_path", {
    method: "PUT",
    body: JSON.stringify({ prompt, profile, learning_path: l }),
  });
  const d = await res.json();
  return { ...defaultData.learning_path, ...d };
}

export async function fetchLearningPath(): Promise<LearningPathProps> {
  const user = await getUser();
  const { data } = await supabase
    .from("learning_paths")
    .select("learning_path")
    .eq("email", user?.email);
  if (data) return mockFetchData({ ...defaultData.learning_path, ...data[0].learning_path });
  return mockFetchData({ ...defaultData.learning_path });
}

export async function updateLearningPath(
  l: LearningPathProps
): Promise<LearningPathProps> {
  console.log("update lp");
  const user = await getUser();
  const { data } = await supabase
    .from("learning_paths")
    .upsert({ email: user?.email, learning_path: l })
    .select();
  if (data) return mockFetchData({ ...defaultData.learning_path, ...data[0].learning_path });
  return mockFetchData({ ...defaultData.learning_path });
}
