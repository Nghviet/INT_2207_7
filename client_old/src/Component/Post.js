import React ,{Component} from 'react';
import {
    Card
} from 'react-bootstrap'
class Post extends Component {
	constructor(props) {
		super(props);
        var post = props.post;
        var date = new Date(post.date);
        var now  = new Date(Date.now());
    
        var time;

        if(date.getFullYear() === now.getFullYear()) {
            if(date.getMonth() === now.getMonth()) {
                if(date.getDate() === now.getDate()) {
                    if(date.getHours() === now.getHours()) {
                        if(date.getMinutes() === now.getMinutes()) {
                            time = (now.getSeconds() - date.getSeconds()) + " seconds ago";
                        }
                        else {
                            time = (now.getMinutes() - date.getMinutes()) + " minutes ago";
                        }
                    }
                    else {
                        time = (now.getHours() - date.getHours()) + " hours ago";
                    }
                }
                else {
                    time = (now.getDate() - date.getDate()) + " days ago";
                }
            }
            else {
                time = (now.getMonth() - now.getMonth()) + " months ago";
            }
        }
        else {
            time = (now.getFullYear() - date.getFullYear()) + " years ago";
        }
        this.state = {
            name : post.name,
            post : post.post,
            time : time 
        }
	

    }

	render() {
		return (
            <Card>  
                <Card.Header>
                    {this.state.name}
                </Card.Header>
                <Card.Body>
                    {this.state.post}
                </Card.Body>
                <Card.Footer>
                    {this.state.time}
                </Card.Footer>
            </Card>
        ); 
	}
}

export default Post;