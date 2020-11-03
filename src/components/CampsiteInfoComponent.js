import React, { Component } from "react";
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	Row,
	Col,
	Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false,
		};
		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen,
		});
	}

	handleSubmit(values) {
		alert("Current state is:" + JSON.stringify(values));
		this.toggleModal();
	}

	render() {
		return (
			<React.Fragment className="col-md-5 m-1">
				<Button
					outline
					className="fa fa-lg fa-pencil offset-auto"
					onClick={this.toggleModal}
				>
					Submit Comment
				</Button>
				<Modal isOpen={this.state.isModalOpen}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
							<Row className="form-group">
								<Label htmlFor="rating" md={12}>
									Rating
								</Label>
								<Col>
									<Control.select
										id="rating"
										model=".rating"
										name="rating"
										className="form-control"
									>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Control.select>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="author" md={12}>
									Your name
								</Label>
								<Col>
									<Control.text
										id="author"
										model=".author"
										name="author"
										className="form-control"
										placeholder="Your name"
										validators={{
											minLength: minLength(2),
											maxLength: maxLength(15),
										}}
									/>
									<Errors
										className="text-danger"
										model=".author"
										show="touched"
										component="div"
										messages={{
											minLength: "Must be at least 2 characters",
											maxLength: "Must be 15 characters or less",
										}}
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="text" md={12}>
									Comment
								</Label>
								<Col>
									<Control.textarea
										id="text"
										model=".text"
										name="text"
										className="form-control"
										rows="6"
									></Control.textarea>
								</Col>
							</Row>
							<Button type="submit" value="submit" color="primary">
								Submit
							</Button>
						</LocalForm>
					</ModalBody>
				</Modal>
			</React.Fragment>
		);
	}
}

function RenderCampsite({ campsite }) {
	if (campsite) {
		return (
			<div className="col-md-5 m-1">
				<Card>
					<CardImg top src={campsite.image} alt={campsite.name} />
					<CardBody>
						<CardText>{campsite.description}</CardText>
					</CardBody>
				</Card>
			</div>
		);
	}
}

function RenderComments({ comments }) {
	if (comments) {
		return (
			<div className="col-md-5 m-1">
				<h4>Comments:</h4>
				{comments.map((comment) => {
					return (
						<div key={comment.id}>
							<div>{comment.text}</div>
							<p>
								- {comment.author},
								{new Intl.DateTimeFormat("en-US", {
									year: "numeric",
									month: "short",
									day: "2-digit",
								}).format(new Date(Date.parse(comment.date)))}
							</p>
						</div>
					);
				})}
				<CommentForm />
			</div>
		);
	}
}

function CampsiteInfo(props) {
	if (props.campsite) {
		return (
			<div className="container">
				<div className="row">
					<div className="col">
						<Breadcrumb>
							<BreadcrumbItem>
								<Link to="/directory">Directory</Link>
							</BreadcrumbItem>
							<BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
						</Breadcrumb>
						<h2>{props.campsite.name}</h2>
						<hr />
					</div>
				</div>
				<div className="row">
					<RenderCampsite campsite={props.campsite} />
					<RenderComments comments={props.comments} />
				</div>
			</div>
		);
	}
	return <div />;
}

export default CampsiteInfo;
