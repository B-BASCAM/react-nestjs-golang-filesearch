import axios from "axios";
import { IAddTaskAction } from "../store/actions/taskActions";


export const addtaskservice = (action: IAddTaskAction): Promise<any> => {
    return (
        axios.post("http://localhost:3000/tasks/createTask", action.payload)
    )
}

