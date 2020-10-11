import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import classes from './Home.module.css';

const Home = props => {

    const getStartedHandler = () => {
        props.history.push('/create');
    }

    return (
        <Jumbotron fluid className={classes.Jumbotron}>
            <h1>Free Online Checklist Creator</h1>
            <p>
                In this website you can create your own checklists, edit them whenever you want, print them and even use them online.<br /> Start managing your daily tasks :)
            </p>

            <Button onClick={getStartedHandler} variant="outline-primary">GET STARTED</Button>

        </Jumbotron>
    );
}

export default Home;