import React from 'react';
import {Card, CardImg, CardBody, CardTitle, CardText} from 'reactstrap';

const Dishdetail = (props) => {
	if (props.selectedDish === null) {
		return <div />;
	}
	const comments = props.dish.comments.map((comment) => {
		return (
			<div key={comment.id} className="m-1">
				<p>{comment.comment}</p>
				<p>-- {comment.author}, {new Intl.DateTimeFormat('pt-BR', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
			</div>
		)
	});	
	const dish = props.dish;
	return (
		<div className="row">
			<div className="col-12 col-md-5 m-1">
				<Card>
					<CardImg width="100%" src={dish.image} alt={dish.name} />
					<CardBody>
						<CardTitle>{dish.name}</CardTitle>
						<CardText>{dish.description}</CardText>
					</CardBody>
				</Card>
			</div>
			<div className="col-12 col-md-5 m-1">
				<Card style={{ border: 'none' }}>
					{comments}
				</Card>
			</div>
		</div>
	)	
}

export default Dishdetail;