import React, { forwardRef }  from 'react'
import "./CSS/Message.css"
import {Card,CardContent,Typography} from '@material-ui/core'

const  Message = forwardRef((props,ref) => {
    const isUser = props.username === props.message.username;
    return (
        <div ref={ref} className={`message ${isUser && 'message_user'}`}> 
        <p className="message__name">{!isUser && `${props.message.username || "Unknonw User"  } `}</p>
            <Card className={isUser ? "message__userCard" :"message__questCard"}><CardContent className='message__typo' >
                <Typography 
                   variant="h5" gutterBottom>
                         {props.message.message} 
                    </Typography>
                </CardContent>
            </Card>
            {/* <h2></h2> */}
        </div>
    )
})

export default Message
