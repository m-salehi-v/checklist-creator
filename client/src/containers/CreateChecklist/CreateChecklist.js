import React, { useState, useEffect, useRef } from 'react';
import { ListGroup, Container, FormCheck, Row, Col, Button, Alert } from 'react-bootstrap';
import classes from './CreateChecklist.module.css';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../store/actions';
import CreateTaskModal from '../../components/CreateTaskModal/CreateTaskModal';
import LoadingButton from '../../components/UI/LoadingButton/LoadingButton';
const CreateChecklist = props => {
    const [title, setTitle] = useState('');
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [curTaskToEdit, setCurTaskToEdit] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const id = useSelector(state => state.auth.userId);
    const token = useSelector(state => state.auth.token);
    const error = useSelector(state => state.checklists.error);
    const isLoading = useSelector(state => state.checklists.loading);
    const isSuccessful = useSelector(state => state.checklists.succeed);
    const checklistToUse = useSelector(state => state.checklists.checklistToUse);
    const isEditingChecklist = useState(props.match.path.includes("edit"))[0];
    const editingSucceed = useSelector(state => state.editChecklist.succeed);
    const editingError = useSelector(state => state.editChecklist.error);
    const editingLoading = useSelector(state => state.editChecklist.loading);

    const dispatch = useDispatch();

    let initialMount = useRef(true);
    useEffect(() => {
        if (initialMount.current) {
            initialMount.current = false;
        } else {
            if (!isLoading && (isSuccessful || error)) {
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
            }
        }
    }, [isSuccessful, error, isLoading]);
    useEffect(() => {
        if (isEditingChecklist && token) {
            if (checklistToUse === null) {
                dispatch(actions.getChecklistById(props.match.params.checklistId, token, 'checklists'));
            }
            if (checklistToUse) {
                setTasks(checklistToUse.tasks);
                setTitle(checklistToUse.title);
            }
        }
    }, [props.match, token, dispatch, checklistToUse, isEditingChecklist])
    const addTaskHandler = (taskTitle, taskBody) => {
        setTasks([...tasks, { checked: false, body: taskBody, title: taskTitle }]);
        toggleModal();
    }
    const toggleModal = () => {
        setShowModal(!showModal);
    }

    const checkboxHandler = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].checked = !updatedTasks[index].checked;
        setTasks(updatedTasks);
    }
    const delelteTaskHandler = (taskIndex) => {
        if(window.confirm("Are you sure to delete this task?")){
            setTasks(tasks.filter((task, index) => index !== taskIndex))
        }
    }
    const hideModal = () => {
        setShowModal(false);
        setIsEdit(false);
        setCurTaskToEdit(null);
    }

    const editTaskHandler = (index, title, body) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].body = body;
        updatedTasks[index].title = title;
        setTasks(updatedTasks);
        toggleModal();
        setIsEdit(false);
        setCurTaskToEdit(null);
    }

    const editButtonHandler = (index) => {
        setIsEdit(true);
        toggleModal();
        setCurTaskToEdit({ ...tasks[index], index: index })
    }

    const saveChecklist = () => {
        const data = {
            title: title,
            tasks: tasks,
            userId: id
        }
        if (isEditingChecklist) {
            dispatch(actions.editChecklist(token, data, props.match.params.checklistId));
        } else {
            dispatch(actions.saveChecklist(data, token));
        }
    }

    const loginToSaveHandler = () => {
        props.history.push('/signin');
    }

    if (editingSucceed) {
        props.history.push('/mychecklists')
        dispatch(actions.setSucceedToFalse())
    }
    return (
        <>
            <CreateTaskModal
                isEdit={isEdit}
                showModal={showModal}
                onHide={hideModal}
                onAddTask={addTaskHandler}
                onEditTask={editTaskHandler}
                taskToEdit={curTaskToEdit} />
            <div>
                {showAlert && !isEditingChecklist ?
                    isSuccessful ?
                        <Alert variant='success'>Checklist is successfully saved.</Alert> :
                        error ?
                            <Alert variant='danger'>An Error Occured :( check your connection and try again later.</Alert> :
                            null :
                    null}
            </div>
            <Container className={classes.Container}>
                <Row >
                    <Col className={classes.ListGroup}>
                        <input
                            className={classes.Title}
                            onChange={(event) => { setTitle(event.target.value) }}
                            placeholder="Your Checklist Title"
                            value={title} />
                        <ListGroup variant="flush">
                            {tasks.map((task, index) => (
                                <ListGroup.Item key={index} className={classes.ListItem}>
                                    <FormCheck style={{ marginTop: '10px' }}
                                        checked={task.checked}
                                        onChange={() => checkboxHandler(index)} />
                                    <div className={classes.ListItemContent}>
                                        <h5 style={task.checked ? { color: '#999' } : null}>
                                            {task.title}
                                        </h5>
                                        <p style={task.checked ? { color: '#999' } : null}>
                                            {task.body}
                                        </p>
                                        <button
                                            className={classes.EditButton}
                                            onClick={() => editButtonHandler(index)}
                                        >
                                            <i className="far fa-edit"></i>
                                        </button>
                                    </div>
                                    <button
                                        className={classes.DelButton}
                                        onClick={() => delelteTaskHandler(index)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <Button className={classes.AddTaskBtn} onClick={toggleModal}>Add Task</Button>
                    </Col>
                    <Col md="auto" className={classes.Buttons}>
                        {isAuthenticated ?
                            <LoadingButton width="100" clicked={saveChecklist}
                                isLoading={isEditingChecklist ? editingLoading : isLoading}> save </LoadingButton> :
                            <LoadingButton clicked={loginToSaveHandler} width='130px'>sign in to save</LoadingButton>
                        }
                        <Button style={{ width: '100px' }}
                            onClick={window.print}
                            variant="outline-warning">print</Button>
                    </Col>

                </Row>

            </Container>
        </>

    );
}

export default CreateChecklist;