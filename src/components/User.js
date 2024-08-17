import React from "react";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";

class User extends React.Component {
  constructor(props) {
    console.log("constructor");
    super(props);
    this.state = {
      userInfo: {
        name: "",
        locaton: "",
        Bio: "",
      },
    };
  }

  async componentDidMount() {
    console.log("componentDidMount");
    const data = await fetch("https://api.github.com/users/Avjamod");

    const json = await data.json();
    this.setState({ userInfo: json });
  }

  componentDidUpdate() {
    console.log("component update..");
  }

  componentWillUnmount() {
    console.log("Component will Unmount.");
  }

  render() {
    console.log("render");
    const { name, location, bio, html_url } = this.state.userInfo;
    return name === "" ? (
      <Shimmer />
    ) : (
      <div className="userInfo ">
        <h3>Name: {name}</h3>
        <h4>Location: {location}</h4>
        <h4>Bio: {bio}</h4>
        <br></br>
        <Link to={html_url}>GitHub Link</Link>
      </div>
    );
  }
}

export default User;
