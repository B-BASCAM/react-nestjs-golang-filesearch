import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { IState } from '../../store/reducers';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { loadTaskDetail } from '../../store/actions/taskDetailActions';

const TaskDetailPage = () => {
    const dispatch = useDispatch();
    const [taskId, setTaskId] = useState("");

    const state = useSelector((state: IState) => state.taskDetail);
    const { taskDetails, taskDetail, loadingStatus } = state;
    const loadDetail = () => {
        dispatch(loadTaskDetail(taskId, "1"));

    }
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.target.value)
    }

    return (
        <div className="grid">

            <div className="col-12">
                <div className="card p-fluid">
                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="firstname1" >Task Id</label>
                            <InputText id="firstname1" type="text" placeholder="Task Id" onChange={onChange} />
                        </div>
                        <Button label="Submit" onClick={loadDetail}></Button>
                    </div>
                </div>
            </div>

            {
                taskDetails ?
                    <div className="col-12">
                        <div className="card">
                            <DataTable value={taskDetails} responsiveLayout="scroll">
                                <Column field="status" header="status"></Column>
                                <Column field="requestedFileName" header="requestedFileName"></Column>
                                <Column field="progressPercentage" header="progressPercentage"></Column>
                                <Column field="countOfMatchedFiles" header="countOfMatchedFiles"></Column>
                                <Column field="createAt" header="createAt"></Column>
                                <Column field="updateAt" header="updateAt"></Column>
                                <Column field="result" header="result"></Column>
                                <Column field="matchedFilePaths" header="matchedFilePaths"></Column>
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
