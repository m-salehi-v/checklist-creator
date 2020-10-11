import React from 'react';
import NavigationBar from '../../components/NavigationBar/NavigationBar';

const layout = props => {
    return(
        <>
        <NavigationBar />
        <main>
            {props.children}
        </main>
        </>
    );
}

export default layout;