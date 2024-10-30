import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import  { useState } from 'react'
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
const Register = () => {


    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const navigate = useNavigate(); 

    const handleSubmit=(event)=>{
        const {id,value}=event.target
        if(id==="name"){
          setName(value)
        }
        else if(id==="email"){
          setEmail(value)
        }
        else if(id==="password"){
          setPassword(value)
        }
        
        

    }
    const doSubmit=async(event)=>{
      event.preventDefault()
      if (!name || !email || !password || !location) {
        alert("Please fill out all fields.");
        return;
    }
     try {
      const response=await fetch("http://localhost:5000/api/register",{
        method:'POST',
      headers: {
          'content-type':'application/json'
        },
        body:JSON.stringify({name,email,password})

      })
      const result= await response.json()
      if(result.ok){
        alert(result.message)
        navigate("/login")
      }
      else{
        alert(result.message)
      }
      
     } catch (error) {
      console.log(error)
     }
      
    }

  return (
   <>
   
  <Card style={{border:'2px solid black'}}>
    <h4>Registration</h4>
    <Form onSubmit={doSubmit} style={{textAlign:'left'}}>
    <Form.Group className="mb-3" >
        <Form.Label>Name</Form.Label><br/>
        <Form.Control type="text"id="name" value={name}  onChange={handleSubmit} style={{width:'270px'}}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label><br/>
        <Form.Control type="email"id="email"   value={email} onChange={handleSubmit} style={{width:'270px'}}/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Password</Form.Label><br/>
        <Form.Control type="password" id="password" value={password} onChange={handleSubmit} style={{width:'270px'}}/>
      </Form.Group>
     
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Card>
</>
  )
}

export default Register