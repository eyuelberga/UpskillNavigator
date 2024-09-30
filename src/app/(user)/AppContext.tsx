import { createContext } from "react";

export interface ProfileProps {
    first_name: string;
    last_name: string;
    department: string;
    current_role: string;
    groups: string[];
    additional_info: string;
};

export interface AppContextProps {
    data: DataProps;
    isLoading:boolean;
    setData?: any;
    fetchProfileAsync: any;
    updateProfileAsync: any;
    genLearningPathAsync: any;
    reGenLearningPathAsync: any;
    fetchLearningPathAsync: any;
    updateLearningPathAsync: any;
};

export interface DataProps {
    profile: ProfileProps;
    departments: string[];
    roles: string[];
    groups: string[];
    learning_path: LearningPathProps;
};

export interface MilestoneProps {
    id: string;
    index: number;
    source: "External" | "Internal";
    type: "Course" | 'Activity' | 'Mentorship',
    title: string;
    description: string;
    duration: string;
    link: string;
    completed: boolean;
}

export interface LearningPathProps {
    title: string;
    milestones: MilestoneProps[]
}

export const defaultData = {
    profile: {
        first_name: "",
        last_name: "",
        department: "",
        current_role: "",
        groups: [],
        additional_info: ""
    },
    departments: [],
    roles: [],
    groups: [],
    learning_path: { title: "", milestones: [] }
}

export const defaultValue: AppContextProps = {
    data: defaultData
};

export const AppContext = createContext(defaultValue);