import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";

import FormDialog from "./Dialog";
import ButtonGeneric from "./Button";

import "./TaskDetails.css";

const TaskDetails = () => {
	const params = useParams();
	const history = useHistory();

	const [title, setTitle] = useState(JSON.parse(window.localStorage.getItem("tasks")).filter(task => {
		return task.id === params.id;
	})[0].title);

	const [description, setDescription] = useState(JSON.parse(window.localStorage.getItem("tasks")).filter(task => {
		return task.id === params.id;
	})[0].description);

	const handleBackButtonClick = () => {
		history.push("../");
	};

	return (
		<>
			<div className="back-button-container">
				<ButtonGeneric onClick={handleBackButtonClick}>Back</ButtonGeneric>
			</div>
			<div className="task-details-container">
				<div className="title-container">
					<h2>{title}</h2>
					<FormDialog title={title} description={description} taskId={params.id} setTitle={setTitle} setDescription={setDescription}/>
				</div>
				<p>{description}</p>
			</div>
		</>
	);
};

export default TaskDetails;