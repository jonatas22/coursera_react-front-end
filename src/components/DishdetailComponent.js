import React, { Component } from 'react';
import {Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button,
        Modal, ModalHeader, ModalBody, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

    class CommentForm extends Component {
        constructor(props) {
            super(props);

            this.state = {
                isCommentModalOpen: false
            }

            this.toggleCommentModal = this.toggleCommentModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            
        }

        toggleCommentModal() {
            this.setState({
                isCommentModalOpen: !this.state.isCommentModalOpen
            })
        }

        handleSubmit(values) {
            this.toggleCommentModal();
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        }        

        render() {
            return(
                <React.Fragment>
                    <Button outline onClick={this.toggleCommentModal}>
                        <span className="fa fa-pencil fa-lg"></span> Submit Comment
                    </Button>
                    <Modal isOpen={this.state.isCommentModalOpen} toggle={this.toggleCommentModal}>
                        <ModalHeader toggle={this.toggleCommentModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <div className="form-group">
                                    <Label htmlFor="rating">Rating</Label>
                                        <Control.select model=".rating" name="rating"
                                                className="form-control"
                                                defaultValue="5">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                        </Control.select>
                                </div>
                                <div className="form-group">
                                    <Label htmlFor="author">Your Name</Label>
                                    <Control.text model=".author" id="author" name="author"
                                                placeholder="Your Name" className="form-control"
                                                validators={{
                                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                                }}
                                                 />
                                    <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be at least 3 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />                                                
                                </div>
                                <div className="form-group">
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea className="form-control" rows="6" 
                                        model=".comment" id="comment" name="comment"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(500)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".comment"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 3 characters',
                                            maxLength: 'Must be 500 characters or less'
                                        }}
                                     />                                        
                                </div>
                                <Button type="submit" color="primary">Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </React.Fragment>                
            )
        }
    }

    function RenderDish({dish}) {
        if (dish != null) {
            return (
                <div className="col-12 col-md-5 m-1">
                    <FadeTransform in 
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                        <Card>
                            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>

                    </FadeTransform>
                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }
    
    function RenderComments({comments, postComment, dishId}) {
        if (comments != null) {
            return (
                    <React.Fragment>
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            <ul className="list-unstyled">
                                <Stagger in>
                                    {comments.map(comment => {
                                        return (
                                            <Fade in>
                                                    <li>
                                                    <p>{comment.comment}</p>
                                                    <p>--{comment.author}, {new Date(comment.date).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}</p>
                                                    </li>
                                            </Fade>
                                    )
                                })}
                                </Stagger>
                            </ul>
                            <CommentForm dishId={dishId} postComment={postComment}/>
                        </div>                        
                    </React.Fragment>
            );
        } else {
            return(
                <div></div>
            );
        }

    }

    const DishDetail = (props) => {
        if (props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            )            
        }        
        else if (props.dish != null) {
            return (
                <div className='container'>
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem ative>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments}
                                        postComment={props.postComment}
                                        dishId={props.dish.id} />
                    </div>    
                </div>
            );
        }
    }
        
export default DishDetail;