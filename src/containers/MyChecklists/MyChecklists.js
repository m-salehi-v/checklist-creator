import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Button, Alert } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import * as actions from '../../store/actions';
import classes from './MyChecklists.module.css';

const MyChecklists = props => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.userId);
    const token = useSelector(state => state.auth.token);
    const error = useSelector(state => state.checklists.error);
    const isLoading = useSelector(state => state.checklists.loading);
    const createdChecklists = useSelector(state => state.checklists.checklists);

    const [expandCreatedChecks, setExpandCreatedChecks] = useState(false);
    const [expandUsedChecks, setExpandUsedChecks] = useState(false);
    useEffect(() => {
        dispatch(actions.fetchChecklists(token, userId));
    }, [token, userId, dispatch]);

    const checklistUseHandler = (checklistId) => {
        props.history.push('/use-checklist/' + checklistId);
    }


    let createdChecklistsToDispaly = expandCreatedChecks ? createdChecklists : createdChecklists.slice(0, 4);
    let content = (
        <div className={classes.Container}>
            {
                error ?
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
                                        <Button className={classes.Button} variant="secondary">edit</Button>
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
    if (isLoading) {
        content = <Spinner animation="border" className={classes.Spinner} />;
    }
    return (
        <div style={{ margin: '100px 30px' }}>
            <div>
                <h4>Your Created Checklists</h4>
                {content}
            </div>
            <div>
                <h4>Your Recently Used Checklists</h4>
            </div>
        </div>
    );
}

export default withRouter(MyChecklists);
