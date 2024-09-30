'use client';
import { AppContext, defaultData } from "./AppContext";
import { useEffect, useState } from 'react';
import { useAsync } from './useAsync';
import { fetchDepartments, fetchGroups, fetchRoles, fetchProfile, updateProfile, genLearningPath, reGenLearningPath, fetchLearningPath, updateLearningPath } from './api';
import Loader from './Loader';
export function Providers({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState(defaultData);
  const fetchInfo = async () => {
    const departments = await fetchDepartments();
    const groups = await fetchGroups();
    const roles = await fetchRoles();
    const profile = await fetchProfile();
    const learning_path = await fetchLearningPath();
    return { departments, groups, roles, profile, learning_path };
  }

  const fetchInfoAsync = useAsync(fetchInfo, { onComplete: (changes: any) => setData({ ...data, ...changes }) });
  const fetchProfileAsync = useAsync(fetchProfile, { onComplete: (profile: any) => setData({ ...data, profile: { ...data.profile, ...profile } }) });
  const updateProfileAsync = useAsync(updateProfile, { onComplete: (profile: any) => setData({ ...data, profile: { ...data.profile, ...profile } }) });
  const genLearningPathAsync = useAsync(genLearningPath);
  const reGenLearningPathAsync = useAsync(reGenLearningPath);
  const fetchLearningPathAsync = useAsync(fetchLearningPath, { onComplete: (learning_path: any) => setData({ ...data, learning_path }) });
  const updateLearningPathAsync = useAsync(updateLearningPath, { onComplete: (learning_path: any) => setData({ ...data, learning_path }) });
  const isLoading = [
    fetchInfoAsync.loading,
    fetchProfileAsync.loading,
    updateProfileAsync.loading,
    genLearningPathAsync.loading,
    fetchLearningPathAsync.loading,
    updateLearningPathAsync.loading]
    .some(v => v)
  useEffect(() => {
    fetchInfoAsync.request();
  }, [])
  return (
    <AppContext.Provider value={{ data, setData, isLoading, fetchProfileAsync, updateProfileAsync, genLearningPathAsync, reGenLearningPathAsync, fetchLearningPathAsync, updateLearningPathAsync }}>
      {fetchInfoAsync.loading || fetchProfileAsync.loading || fetchLearningPathAsync.loading ? <Loader /> : children}
    </AppContext.Provider>
  );
}