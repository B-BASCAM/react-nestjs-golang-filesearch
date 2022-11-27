import axios from "axios";
import { IAddTodoAction } from '../store/actions/todosActions';

export const addtodoservice = (action: IAddTodoAction): Promise<any> => {
    return (
        axios.post("http://localhost:5000/todos", action.payload)
    )
}

