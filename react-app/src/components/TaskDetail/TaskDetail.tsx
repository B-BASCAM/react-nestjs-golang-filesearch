import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { IState } from '../../store/reducers';
import { addTask } from '../../store/actions/taskActions';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const TaskDetailPage = () => {
    const dispatch = useDispatch();
    const [fileName, setFileName] = useState("");

    const state = useSelector((state: IState) => state.task);
    const { tasks, task, loadingStatus } = state;
    const addTasks = () => {
        dispatch(addTask(fileName));

    }
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFileName(e.target.value)
    }

    return (
        <div className="grid">

            <div className="col-12">
                <div className="card p-fluid">
                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="firstname1" >File Name</label>
                            <InputText id="firstname1" type="text" placeholder="File Name" onChange={onChange} />
                        </div>
                        <Button label="Submit" onClick={addTasks}></Button>
                    </div>
                </div>
            </div>

            {
                tasks ?
                    <div className="col-12">
                        <div className="card">
                            <DataTable value={tasks} responsiveLayout="scroll">
                                <Column field="id" header="id"></Column>
                                <Column field="requestedFileName" header="requestedFileName"></Column>
                                <Column field="status" header="status"></Column>
                            </DataTable>
                        </div>
                    </div>
                    : ""
            }



        </div>
    );
}

const comparisonFn = function (prevProps: any, nextProps: any) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(TaskDetailPage, comparisonFn);
