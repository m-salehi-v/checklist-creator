import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Button, Alert } from 'react-bootstrap';

import * as actions from '../../store/actions';
import classes from './MyChecklists.module.css';

const MyChecklists = props => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.userId);
    const token = useSelector(state => state.auth.token);
    const errorCreated = useSelector(state => state.checklists.error);
    const isLoadingCreate = useSelector(state => state.checklists.loading);
    const errorUsed = useSelector(state => state.usedChecklists.error);
    const isLoadingUsed = useSelector(state => state.usedChecklists.loading);
    const createdChecklists = useSelector(state => state.checklists.checklists);
    const usedChecklists = useSelector(state => state.usedChecklists.usedChecklists);

    const [expandCreatedChecks, setExpandCreatedChecks] = useState(false);
    const [expandUsedChecks, setExpandUsedChecks] = useState(false);
    useEffect(() => {
        if (token) {
            dispatch(actions.fetchChecklists(token, userId));
            dispatch(actions.fetchUsedChecklists(token, userId));
        }
    }, [token, userId, dispatch]);

    const checklistUseHandler = (checklistId) => {
        props.history.push('/usechecklist/checklists/' + checklistId);
    }
    const checklistEditHandler = (checklistId) => {
        props.history.push('/edit/checklists/' + checklistId);
    }
    const usedChecklistsUseHandler = (checklistId) => {
        props.history.push('/usechecklist/used-checklists/' + checklistId);
    }

    let createdChecklistsToDispaly = expandCreatedChecks ? createdChecklists : createdChecklists.slice(0, 4);
    let contentCreated = (
        <div className={classes.Container}>
            {
                errorCreated ?
                    <Alert variant="danger">Unable to load your checklists :( reload the page.</Alert> :
                    <>
                        {
                            createdChecklistsToDispaly.map((el, index) => (
                                <div className={classes.Card} key={index}>
                                    <h5>{el.title}</h5>
                                    <div>
                                        <Button
                                            onClick={() => checklistUseHandler(el.id)}
                                            style={{ marginRight: '10px' }}
                                            className={classes.Button}
                                            variant="primary"
                                        >use</Button>

                                        <Button
                                            onClick={() => checklistEditHandler(el.id)}
                                            className={classes.Button}
                                            variant="secondary"
                                        >edit</Button>
                                    </div>
                                </div>
                            ))
                        }
                        <Button onClick={() => setExpandCreatedChecks(!expandCreatedChecks)}
                            style={{ height: '150px', background: 'none', border: 'none' }}>
                            {expandCreatedChecks ?
                                <i style={{ fontSize: '50px', color: 'blue' }} className="fas fa-minus-circle"></i> :
                                <i style={{ fontSize: '50px', color: 'blue' }} className="fas fa-plus-circle"></i>
                            }
                        </Button>
                    </>
            }

        </div >
    );

    let usedChecklistsToDispaly = expandUsedChecks ? usedChecklists : usedChecklists.slice(0, 4);
    let contentUsed = (
        <div className={classes.Container}>
            {
                errorUsed ?
                    <Alert variant="danger">Unable to load your checklists :( reload the page.</Alert> :
                    <>
                        {
                            usedChecklistsToDispaly.map((el, index) => (
                                <div className={classes.Card} key={index}>
                                    <h5>{el.title}</h5>
                                    <p style={{ fontSize: '14px' }}>{new Date(el.date).toLocaleString()}</p>
                                    <p>{el.completedTasks} / {el.tasksNum} completed</p>
                                    <div>
                                        <Button
                                            onClick={() => usedChecklistsUseHandler(el.id)}
                                            className={classes.Button}
                                            variant="primary"
                                        >use</Button>
                                    </div>
                                </div>
                            ))
                        }
                        <Button onClick={() => setExpandUsedChecks(!expandUsedChecks)}
                            style={{ height: '150px', background: 'none', border: 'none' }}>
                            {expandUsedChecks ?
                                <i style={{ fontSize: '45px', color: 'blue' }} className="fas fa-minus-circle"></i> :
                                <i style={{ fontSize: '45px', color: 'blue' }} className="fas fa-plus-circle"></i>
                            }
                        </Button>
                    </>
            }

        </div >
    );
    if (isLoadingCreate) {
        contentCreated = <Spinner animation="border" className={classes.Spinner} />;
    }
    if (isLoadingUsed) {
        contentUsed = <Spinner animation="border" className={classes.Spinner} />;
    }
    return (
        <div style={{ margin: '100px 30px' }}>
            <div>
                <h4>Your Created Checklists</h4>
                {contentCreated}
            </div>
            <div>
                <h4>Your Recently Used Checklists</h4>
                {contentUsed}
            </div>
        </div>
    );
}

export default MyChecklists;
