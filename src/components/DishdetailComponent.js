import React from 'react';
import {Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

    function RenderDish({dish}) {
        if (dish != null) {
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }
    
    function RenderComments({comments}) {
        if (comments != null) {
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                        {comments.map(comment => {
                            return (
                                <ul key={comment.id} className="list-unstyled">
                                    <li>{comment.comment}</li>
                                    <li>--{comment.author}, {new Date(comment.date).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}</li>
                                </ul>
                            )
                        })}
                </div>
            );
        } else {
            return(
                <div></div>
            );
        }

    }

    const DishDetail = (props) => {
        return (
            <div className='container'>
                <div class="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem ative>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div class="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} />
                </div>    
            </div>);
    }
        
export default DishDetail;