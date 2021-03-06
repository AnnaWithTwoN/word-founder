import React from 'react'
import axios from 'axios'
import  { UserContext } from '../contexts/UserContext.js'

class LoginPage extends React.Component {
    static contextType = UserContext
    state = {
        username: '',
        password: '',
        sumbitError: ''
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    login = (event) => {
        event.preventDefault()
        console.log("logging", this.state.username, " ", this.state.password)

        // post(url, data, config)
        axios.post('http://localhost:4000/users/login', {
            username: this.state.username,
            password: this.state.password
        }, { withCredentials: true })
        .then(res => {
            this.context.setUser(res.data)
            this.setState({ username: '', password: ''})
            localStorage.setItem('userId', res.data._id)
            this.props.history.push('/')
        })
        .catch(error => {
            console.log(error)
            this.setState({
                sumbitError: 
                    error.response ? 
                    error.response.data.message :
                    error.message
            })
        })
    }

    render(){
        return (
            <div className='container'>
                <h2 className="mt-4">Please login</h2>
                <form onSubmit={ this.login } className="mt-4">
                    <div className="form-group">
                        <label>Username: *</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Enter username" 
                            name="username"
                            value={ this.state.username } 
                            onChange={ this.onChange } 
                            required />
                    </div>
                    <div className="form-group">
                        <label>Password: *</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Enter password" 
                            name="password"
                            value={ this.state.password } 
                            onChange={ this.onChange } 
                            required />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <span 
                    style={{ 
                        color: 'red', 
                        display: this.state.sumbitError === '' ? 'none' : 'block'}}
                        className="mt-2">
                    { this.state.sumbitError }
                </span>
            </div>
        );
    }
  
}

export default LoginPage;
