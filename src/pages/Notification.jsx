import React from 'react';
import Card from '../components/Card';
import {Grid, Image, Text} from '../elements'

const Notification = (props) => {
    let noti = [
        { user_name: 'aaaaa', post_id: 'post1', image_url: ''},
        { user_name: 'aaaaa', post_id: 'post2', image_url: ''},
        { user_name: 'aaaaa', post_id: 'post3', image_url: ''},
        { user_name: 'aaaaa', post_id: 'post4', image_url: ''},
        { user_name: 'aaaaa', post_id: 'post5', image_url: ''},
        { user_name: 'aaaaa', post_id: 'post6', image_url: ''},
    ];
    return (
        <>
            <Grid padding='16px' bg='#eff6ff'>
                {noti.map(n => {
                    return(
                        <Card key={n.post_id} {...noti}/>
                    )
                })}
            </Grid>
        </>
    );
};

export default Notification;