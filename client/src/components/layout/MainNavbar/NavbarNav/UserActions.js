import React from "react";
// import { Link } from "react-router-dom";

import { USER_DATA } from '../../../../Constants';

import { Button, Modal, Form } from 'react-bootstrap';

import Dropdown from 'react-bootstrap/Dropdown';

import axios from "axios";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href="/#"
    className="text-decoration-none dropdown-toggle"
    style={{color: "rgba(0, 0, 0, 0.5)"}}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      showModal: false,
      register: false,
      userId: '',
      validated: false,
      userIdMsg: '',
      userIdValid: true
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleLoginRegisterToggle = this.handleLoginRegisterToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  showModal = (e) => {
    this.setState({ showModal: true, register: false });
  }

  hideModal = (e) => {
    console.log("test hide modal");
    console.log(this.state.userId);
    this.setState({ showModal: false });
  }

  handleFormChange (event) {
    let {name: fieldName, value} = event.target;
    this.setState({ [fieldName]: value });
  }

  handleLogout() {
      USER_DATA.logOutMyAppUser();
      window.location.reload();
  }

  handleLoginRegisterToggle() {
    this.setState({
      register: !this.state.register
    })
  }

  handleOnFocus(){
    this.setState({
      userIdMsg: ''
    })
  }

  async handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    // const form = event.currentTarget;
    const userId = this.state.userId.trim();
    const isLogin = !this.state.register;

    if( !userId ){
      this.setState({
        userIdValid: false,
        userIdMsg: 'Required'
      })
      return;
    }

    try {
      const url = isLogin ? '/loginUser' : 'registerUser';
      const res = await axios.post(url, {
        isLogin: isLogin,
        userId: userId
      });

      const responseData = res.data;

      this.setState({
        userIdValid: responseData.success,
        userIdMsg: responseData.msg
      });

      if( responseData.success) {
        setTimeout(() => {
          USER_DATA.storeMyAppUser(userId);
          window.location.reload();
        }, 500);
      }
    } catch(error) {
        console.log(Object.keys(error), error.message);
        this.setState({
          userIdValid: false,
          userIdMsg: 'Error'
        });
    }
  }

  render() {
    return (
      <div style={{width: '250px'}}>

        {
          !USER_DATA.myAppUser() &&
          <div className="d-flex d-flex-row h-100 justify-content-center align-items-center">
            <i className="material-icons mr-2">&#xE879;</i>
            <a style={{position:'relative',top:'2px',cursor: 'pointer'}} onClick={this.showModal} className="text-primary">Log In Test</a>
          </div>
        }

        {
          USER_DATA.myAppUser() &&
          <Dropdown className="d-flex d-flex-row h-100 justify-content-center align-items-center">
              <Dropdown.Toggle as={CustomToggle} style={{color:'rgba(0,0,0,.5)'}} className="text-decoration-none">
                <span><i style={{fontSize:'1.5rem', color: '#007bff'}}className="material-icons">person</i></span>
                <span style={{color:'rgba(0,0,0,.5)', display: 'inline-block', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                {USER_DATA.myAppUser()}
                </span>
              </Dropdown.Toggle>
          <Dropdown.Menu style={{maxWidth:'150px'}}>
          <Dropdown.Item className="text-danger" ventKey="1" onClick={this.handleLogout}>
              <i className="material-icons">&#xE879;</i>Logout
          </Dropdown.Item>
          </Dropdown.Menu>

          </Dropdown>
        }

        <Modal
          show={this.state.showModal} onHide={(e)=> this.hideModal(e)}
          >
          <Form noValidate  onSubmit={this.handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.register ? 'Register' : 'Log In'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form.Group>
                <Form.Label>User ID</Form.Label>
                <Form.Control  type="text" placeholder={this.state.register ? 'Enter a user id to register...' : 'Enter user id to log in...'} name="userId" value={this.state.userId} onFocus={this.handleOnFocus} onChange={this.handleFormChange} />
                {
                this.state.userIdValid &&
                <div className="mt-1 text-success small">
                    {this.state.userIdMsg}
                </div>
                }
                { !this.state.userIdValid &&
                <div className="mt-1 text-danger small" >
                    {this.state.userIdMsg}
                </div>
                }
                <Button variant="link" onClick={this.handleLoginRegisterToggle} className="text-primary pl-0 mt-3 font-weight-bold">{this.state.register ? 'Log In' : 'Register'}</Button>
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.hideModal}>Close</Button>
              <Button variant="primary" type="submit">Submit</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }
}
