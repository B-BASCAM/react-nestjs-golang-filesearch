import axios from "axios";
import { ILoadTaskDetailAction } from "../store/actions/taskDetailActions";


export const loadTaskDetailService = (action: ILoadTaskDetailAction): Promise<any> => {
    return (
        axios.get("http://localhost:3000/tasks/showTaskDetail/" + action.payload.taskId + "/" + action.payload.pageNum)
    )
}