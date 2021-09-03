import React, {useState, useEffect} from 'react';
// import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import TaskDetails from './components/TaskDetails';

import './App.css'

const App = () => {

const [tasks, setTasks] = useState(JSON.parse(window.localStorage.getItem("tasks")));

  const handleTaskClick = (taskId) => {
		const newTasks = tasks.map((task) => {
			if (task.id === taskId) return { ...task, completed: !task.completed };

			return task;
		});

		setTasks(newTasks);
	};

	const handleTaskAddition = (taskTitle) => {
		const newTasks = [
			...tasks,
			{
				title: taskTitle,
				id: uuidv4(),
				completed: false,
				description: `To do this activity is very simple! Just get started. Tip: If you think it's too big, break it down into smaller activities. And remember: the important thing is to try!`
			},
		];

		setTasks(newTasks);
	};

	const handleTaskDeletion = (taskId) => {
		const newTasks = tasks.filter((task) => task.id !== taskId);

		setTasks(newTasks);
	};


	//Saving to localStorage:
	useEffect(() => {
		window.localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);


	//Loading from localStorage:
	useEffect(() => {
		const json = localStorage.getItem("tasks");
		const savedTasks = JSON.parse(json);
		if (savedTasks) {
			setTasks(savedTasks);
		}
	}, []);

	

	return (
		<Router>
			<div className="container">
				<Header />
				<Route
					path="/"
					exact
					render={() => (
						<>
							<AddTask handleTaskAddition={handleTaskAddition} />
							<Tasks
								tasks={tasks}
								handleTaskClick={handleTaskClick}
								handleTaskDeletion={handleTaskDeletion}
							/>
						</>
					)}
				/>
				<Route path="/:id" component={TaskDetails} />
			</div>
		</Router>
	);
};

export default App;