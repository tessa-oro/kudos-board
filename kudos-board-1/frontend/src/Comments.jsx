import React from 'react';
import "./Comments.css"

function Comments( { content } ) {
    return (
        <div id="comment">
            <p>{content}</p>
        </div>
    );
}
 
export default Comments;