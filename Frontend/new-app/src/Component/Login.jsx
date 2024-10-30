import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';



const Login = () => {

   
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate = useNavigate(); 


    const handleSubmit=(event)=>{
        const {id,value}=event.target
        if(id==="email"){
          setEmail(value)
        }
        else if(id==="password"){
          setPassword(value)
        }

    }
    const doSubmit = async (event) => {
        event.preventDefault();
        if (!email || !password) {
            alert("Please fill out all fields.");
            return;
        }
        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ email, password })
            });
    
            const result = await response.json();
            if (response.ok) {
                localStorage.setItem('token', result.token);
                alert(result.name);
                navigate('/task-dashboard');
            } else {
                alert(result.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error); 
        }
    };
    

  return (
   <>
   
  <Card style={{border:'2px solid black'}}>
    <h4>Login</h4>
    <Form onSubmit={doSubmit} style={{textAlign:'left'}}>
      <Form.Group className="mb-3" >
        <Form.Label>Email address</Form.Label><br/>
        <Form.Control type="email"  id="email" value={email} onChange={handleSubmit} style={{width:'270px'}}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label><br/>
        <Form.Control type="password"  id="password"value={password} onChange={handleSubmit} style={{width:'270px'}}/>
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Card>
   </>
  )
}

export default Login