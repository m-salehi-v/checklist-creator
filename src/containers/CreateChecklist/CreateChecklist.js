import React, { useState } from 'react';
import { ListGroup, Container, FormCheck, Row, Col, Button } from 'react-bootstrap';
import classes from './CreateChecklist.module.css';

import CreateTaskModal from '../../components/CreateTaskModal/CreateTaskModal';
const CreateChecklist = props => {
    const [title, setTitle] = useState('');
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [curTaskToEdit, setCurTaskToEdit] = useState(null);
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
        setTasks(tasks.filter((task, index) => index !== taskIndex))
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
        // setCurIndexToEdit(index);
        setCurTaskToEdit({...tasks[index], index: index})
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
            <Container style={{ maxWidth: '90%', margin: '0 0 0 auto' }}>
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
                                        <h5>{task.title}</h5>
                                        <p>{task.body}</p>
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
                        <Button onClick={toggleModal}>Add Task</Button>
                    </Col>
                    <Col md="auto" className={classes.Buttons}>
                        <Button variant="danger" style={{ width: '100px' }}>SAVE</Button>
                    </Col>

                </Row>

            </Container>
        </>

    );
}

export default CreateChecklist;