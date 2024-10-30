import { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TaskDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null); 
    const navigate = useNavigate();

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/tasks', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log('Fetched tasks:', data);
            setTasks(data);
        } catch (error) {
            console.error( error);
        }
    };

    useEffect(() => {
        fetchTasks(); 
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/login'); 
    };

    const handleCreateOrUpdateTask = async (event) => {
        event.preventDefault();
        const url = currentTaskId ? `http://localhost:5000/api/tasks/${currentTaskId}` : 'http://localhost:5000/api/tasks';
        const method = currentTaskId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description, status, dueDate }),
            });

            if (response.ok) {
                
                setTitle('');
                setDescription('');
                setStatus('');
                setDueDate('');
                setCurrentTaskId(null); 
                setShowForm(false);
                fetchTasks();
            } else {
                const result = await response.json();
                alert(result.message );
            }
        } catch (error) {
            console.error( error);
        }
    };

    const handleUpdateButtonClick = (taskId) => {
        setCurrentTaskId(taskId); 
        setTitle(''); 
        setDescription(''); 
        setStatus(''); 
        setDueDate(''); 
        setShowForm(true); 
    };
    const handleDeleteTask = async (taskId) => {
            try {
                const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    fetchTasks();
                } else {
                    const result = await response.json();
                    alert(result.message );
                }
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        
    };
    return (
        <div>
            <h2>Task Dashboard</h2>
            <Button variant="primary" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cancel" : "Create Task"}
            </Button>

            {showForm && (
                <Card style={{ marginTop: '20px', padding: '20px' }}>
                    <Form onSubmit={handleCreateOrUpdateTask}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="success" type="submit"> {currentTaskId ? 'Update Task' : 'Add Task'}
                        </Button>
                    </Form>
                </Card>
            )}

            <h3>Your Tasks</h3>
            {tasks.length === 0 ? (
                <p>No tasks available.</p>
            ) : (
                <ul className="task-list">
                    {tasks.map(task => (
                        <li key={task._id} className="task-item">
                            <h4>{task.title}</h4>
                            <p>{task.description}</p>
                            <p>Status: {task.status}</p>
                            <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                            <Button variant="success" onClick={() => handleUpdateButtonClick(task._id)}>Update</Button>
                            <Button variant="danger" onClick={() => handleDeleteTask(task._id)}>Delete</Button>                       
                             </li>
                    ))}
                </ul>
            )}
            <Button variant="secondary" onClick={handleLogout}>Logout</Button>
        </div>
    );
};

export default TaskDashboard;
