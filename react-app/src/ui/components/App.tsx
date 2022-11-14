import React, { ChangeEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { ITodoItem } from '../../types/todoitem';
import { ApiStatus } from '../../types/apistatus';
import Paper from '@material-ui/core/Paper';
import { CircularProgress, Typography } from '@material-ui/core';
import { addTodo, loadTodos } from '../../store/actions/todosActions';
import { IState } from '../../store/reducers';


const styles = (theme: Theme) => createStyles({
  wrap: {
    display: 'flex',
    justifyContent: 'center'
  },
  content: {
    width: 500
  },
  addButton: {
    marginTop: theme.spacing.length
  },
  divider: {
    marginTop: theme.spacing.length * 2,
    marginBottom: theme.spacing.length * 2
  },
  todoItem: {
    padding: 20,
    marginTop: 20,
    marginBottom: 20
  }
});

const App = (props: any) => {


  const dispatch = useDispatch();

  const state = useSelector((state: IState) => state.todos);

  const [description, setDescription] = useState("");

  const { classes } = props

  useEffect(() => {
    dispatch(loadTodos());
  }, [])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  const addTodo_1 = () => {
    dispatch(addTodo(description));
  }

  const { todos, loadingStatus } = state;

  return (

    <div className={classes.wrap}>
      <div className={classes.content}>

        <div>
          <TextField multiline placeholder="Enter todo message" rows="5" variant="outlined" onChange={onChange} value={description} fullWidth />
          <Button className={classes.addButton} color="primary" variant="contained" fullWidth onClick={addTodo_1}>Add Todo</Button>
        </div>

        <Divider className={classes.divider} />

        <div>
          {loadingStatus === ApiStatus.LOADING && <CircularProgress />}

          {loadingStatus === ApiStatus.FAILED && <Typography color="error">Failed to load todos</Typography>}

          {loadingStatus === ApiStatus.LOADED && todos.map((todo: ITodoItem) => (
            <Paper key={todo.id} className={classes.todoItem}>
              {todo.description}
            </Paper>
          ))}
        </div>

      </div>
    </div>
  );

}

export default withStyles(styles)(App);


