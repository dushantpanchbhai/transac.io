import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import {login} from "../../store/action";

class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount()
  {
      let userInfo = localStorage.getItem("userInfo");
      if(userInfo)
      {
          userInfo = JSON.parse(userInfo);
          this.props.loggingIn(userInfo);
      }
  }

  render() {
    return (
        <>
        {this.props.isLogged && <Navigate to={`/home/${this.props.user._id}`}/>}
        <div>Start Page</div>
        </>
    );
  }
}

function mapStateToProps(state)
{
    const isLogged = state.isLogged;
    const user = state.user;
    return {isLogged,user};
}

const mapDispatchToProps = (dispatch) =>{
    return {
        loggingIn :(data)=> dispatch(login(data)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(StartPage);
