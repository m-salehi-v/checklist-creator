import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const CreateTaskModal = props => {

    const [taskTitle, setTaskTitle] = useState('');
    const [taskBody, setTaskBody] = useState('');

    useEffect(() => {
        setTaskTitle(props.isEdit ? props.taskToEdit.title : '');
        setTaskBody(props.isEdit ? props.taskToEdit.body : '');
    }, [props.isEdit, props.taskToEdit]);

    const addTaskHandler = () => {
        props.onAddTask(taskTitle, taskBody);
        setTaskTitle('');
        setTaskBody('');
    }

    const editTaskHandler = () => {
        props.onEditTask(props.taskToEdit.index, taskTitle, taskBody);
        setTaskTitle('');
        setTaskBody('');
    }
    return (

        <Modal show={props.showModal}
            size="lg"
            centered>
            <Modal.Header>
                <Modal.Title>
                    {props.isEdit ? 'Edit Your Task' : 'Create Your Task'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group >
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Task Title"
                            value={taskTitle}
                            onChange={(event) => { setTaskTitle(event.target.value) }}
                        ></Form.Control>
                    </Form.Group>
                    {props.isEdit ?
                        <Form.Group >
                            <Form.Label>Body</Form.Label>
                            <Form.Control as="textarea"
                                rows="3"
                                type="text"
                                placeholder="Task Body..."
                                value={taskBody}
                                onChange={(event) => { setTaskBody(event.target.value) }}
                            ></Form.Control>
                        </Form.Group> :
                        null
                    }

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={props.isEdit ? editTaskHandler : addTaskHandler}
                    variant="primary" type="submit">
                    {props.isEdit ? 'Submit' : 'Add'}
                </Button>
                <Button variant="secondary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateTaskModal;