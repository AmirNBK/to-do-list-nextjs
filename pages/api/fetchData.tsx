export const fetchTasks = async (setTasks: (tasks: Task[]) => void): Promise<Task[]> => {
    try {
        const response = await fetch(
            'https://647cf535c0bae2880ad15c4d.mockapi.io/api/v1/tasks'
        );
        const fetchedTasks: Task[] = await response.json();
        setTasks(fetchedTasks);
        return fetchedTasks;
    } catch (error) {
        console.error(error);
        return [];
    }
};

interface Task {
    task: string;
    isComplete: boolean;
    id: string;
}
