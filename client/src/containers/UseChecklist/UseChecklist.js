import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, ListGroup, FormCheck, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import classes from '../CreateChecklist/CreateChecklist.module.css';
import * as actions from '../../store/actions';
import LoadingButton from '../../components/UI/LoadingButton/LoadingButton';

const UseChecklist = props => {
    const dispatch = useDispatch();
    const checklist = useSelector(state => state.checklists.checklistToUse);
    const isLoading = useSelector(state => state.usedChecklists.loading);
    const saveUsedChecklistSucceed = useSelector(state => state.usedChecklists.saveUsedChecklistSucceed);
    const token = useSelector(state => state.auth.token);

    const [checkedItemsNum, setCheckedItemsNum] = useState(null);
    useEffect(() => {
        if(token) {
            const checklistId = props.match.params.checklistId;
            const path = props.match.params.path;
            dispatch(actions.getChecklistById(checklistId, token, path));
        }
    }, [dispatch, props.match.params.checklistId, token, props.match.params.path]);

    const getNumberOfCheckedItems = () => {
        if (checklist === null) {
            return 0
        }
        let sum = 0;
        checklist.tasks.forEach(task => {
            if (task.checked) {
                sum++;
            }
        });
        return sum;
    }

    const checkboxHandler = (index) => {
        const updatedChecklist = { ...checklist };
        const updatedTasks = [...checklist.tasks];
        setCheckedItemsNum(updatedTasks[index].checked ? checkedItemsNum - 1 : checkedItemsNum + 1);
        updatedTasks[index].checked = !updatedTasks[index].checked;
        updatedChecklist.tasks = updatedTasks;
        dispatch(actions.setChecklistToUse(updatedChecklist));
    }

    const saveChecklist = () => {
        dispatch(actions.saveUsedChecklist(token, {...checklist, completedTasks: checkedItemsNum, tasksNum: tasksNum}));
    }

    if(saveUsedChecklistSucceed) {
        return <Redirect to="/mychecklists" />
    }

    if (checklist === null) {
        return null
    }

    const tasksNum = checklist.tasks.length;

    if (checkedItemsNum === null) {
        setCheckedItemsNum(getNumberOfCheckedItems());
    }
    return (
        <Container className={classes.Container}>
            <Row >
                <Col className={classes.ListGroup}>
                    <h2 className={classes.Title}>{checklist.title}</h2>
                    <ListGroup variant="flush">
                        {checklist.tasks.map((task, index) => (
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
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col md="auto" className={classes.Buttons}>
                    <h6
                        style={{ color: checkedItemsNum === tasksNum ? 'green' : 'red' }}>
                        {checkedItemsNum} / {tasksNum} tasks completed
                    </h6>
                    <LoadingButton width="100" clicked={saveChecklist}
                        isLoading={isLoading}> Done </LoadingButton>
                    <Button style={{ width: '100px' }}
                            onClick={window.print}
                            variant="outline-warning">print</Button>
                </Col>

            </Row>

        </Container>
    );
}

export default UseChecklist;