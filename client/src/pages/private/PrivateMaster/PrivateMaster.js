// React
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// Redux
import { connect } from "react-redux";
// grid
import Row from "../../../components/shared/grid/Row";
// Component
import Nav from "../../../components/shared/Nav";
import Users from "../Users";

class PrivateMaster extends Component {
  constructor() {
    super();
    this.state = {
      metadata: {
        currentPage: "projects",
        projectIsLoaded: false,
        projectSubpage: "tasks",
        userSubpage: "view",
        currentThreadIndex: 0,
        editProject: false,
        createTask: false,
        editTask: false,
        createThread: false,
        editThread: false,
        createComment: false,
        editComment: false,
        createPost: false,
        editPost: false
      },
      user: {
        username: null
      },
      projects: [],
      currentProject: {
        title: "",
        status: "",
        summary: "",
        funds: ""
      },
      newData: {
        newUser: {
          username: "",
          password: "",
          firstName: "",
          lastName: "",
          email: ""
        },
        newTask: {
          title: "",
          description: "",
          funds: ""
        },
        newThread: {
          title: "",
          comment: ""
        },
        newComment: {
          comment: ""
        }
      },
      targetEdits: {
        task: ""
      }
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.setUser(this.props.user);
  }

  setUser = username => {
    this.setState({
      user: {
        ...this.state.user,
        username: username
      }
    });
  };

  loadUserSubpage = page => {
    if (page === "view") {
      this.setState({
        metadata: {
          ...this.state.metadata,
          userSubpage: "view"
        }
      });
    } else if (page === "add") {
      this.setState({
        metadata: {
          ...this.state.metadata,
          userSubpage: "add"
        }
      });
    } else if (page === "edit-user") {
      this.setState({
        metadata: {
          ...this.state.metadata,
          projectSubpage: "edit-user"
        }
      });
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    const context = event.target.getAttribute("data-context");
    switch (context) {
      case "project":
        this.setState({
          currentProject: {
            ...this.state.currentProject,
            [name]: value
          }
        });
        break;
      case "newUser":
        this.setState({
          newData: {
            ...this.state.newData,
            newUser: {
              ...this.state.newData.newUser,
              [name]: value
            }
          }
        });
        break;
      case "createTask":
        this.setState({
          newData: {
            ...this.state.newData,
            newTask: {
              ...this.state.newData.newTask,
              [name]: value
            }
          }
        });
        break;
      case "editTask":
        const index = event.target.getAttribute("data-index");
        const tasks = this.state.currentProject.tasks.slice();
        tasks[tasks.length - 1 - parseInt(index, 10)] = {
          ...tasks[tasks.length - 1 - parseInt(index, 10)],
          [name]: value
        };
        this.setState({
          currentProject: {
            ...this.state.currentProject,
            tasks: tasks
          }
        });
        break;
      case "createThread":
        this.setState({
          newData: {
            ...this.state.newData,
            newThread: {
              ...this.state.newData.newThread,
              [name]: value
            }
          }
        });
        break;
      case "createComment":
        this.setState({
          newData: {
            ...this.state.newData,
            newComment: {
              ...this.state.newData.newComment,
              [name]: value
            }
          }
        });
        break;

      default:
        break;
    }
  };

  render() {
    return (
      <div>
        <Nav isPublic={true} />
        <h3>Hello, {this.props.user.firstName}! This is the dashboard</h3>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    userInfo: state.userInfo
  };
};

export default connect(mapStateToProps)(withRouter(PrivateMaster));
