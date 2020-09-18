import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

import './LoadingButton.css';
const LoadingButton = props => {
    return (
        <Button className="Button"
        style={{width: props.width + 'px'}}
         onClick={props.clicked}
            variant="warning">
            {props.isLoading ?
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                /> :
                props.children} </Button>
    );
}

export default LoadingButton;