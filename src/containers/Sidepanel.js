import React from "react";
import { Spin, Icon, Input, Button } from "antd";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import * as navActions from "../store/actions/nav";
import * as messageActions from "../store/actions/message";
import Contact from "../components/Contact";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Sidepanel extends React.Component {
  state = {
    loginForm: true
  };

  waitForAuthDetails() {
    const component = this;
    setTimeout(function () {
      if (
        component.props.token !== null &&
        component.props.token !== undefined
      ) {
        component.props.getUserChats(
          component.props.username,
          component.props.token
        );
        return;
      } else {
        component.waitForAuthDetails();
      }
    }, 100);
  }

  componentDidMount() {
    this.waitForAuthDetails();
  }

  openAddChatPopup() {
    this.props.addChat();
  }

  changeForm = () => {
    this.setState({ loginForm: !this.state.loginForm });
  };

  authenticate = e => {
    e.preventDefault();
    if (this.state.loginForm) {
      this.props.login(e.target.username.value, e.target.password.value);
    } else {
      this.props.signup(
        e.target.username.value,
        e.target.password.value,
        e.target.password2.value
      );
    }
  };

  render() {
    let activeChats = this.props.chats.map(c => {
      return (
        <Contact
          key={c.id}
          name={c.userName}
          picURL={c.picURL}
          status={c.status}
          chatURL={`/${c.id}`}
        />
      );
    });
    return (
      <div id="sidepanel">
        <div id="profile">
          <div className="wrap">
            <div id="expanded">
              {this.props.loading ? (
                <Spin indicator={antIcon} />
              ) : this.props.isAuthenticated ? (
                <Button onClick={() => this.props.logout()} className="authBtn">
                  <span>Logout</span>
                </Button>
              ) : (
                    <div>
                      <form method="POST" onSubmit={this.authenticate}>
                        {this.state.loginForm ? (
                          <div>
                            <Input
                              name="username"
                              type="text"
                              placeholder="username"
                            />
                            <Input
                              name="password"
                              type="password"
                              placeholder="password"
                            />
                          </div>
                        ) : (
                            <div>
                              <Input
                                name="username"
                                type="text"
                                placeholder="username"
                              />

                              <Input
                                name="password"
                                type="password"
                                placeholder="password"
                              />
                              <Input
                                name="password2"
                                type="password"
                                placeholder="password confirm"
                              />
                            </div>
                          )}

                        <Button htmlType="submit" type="primary" >Authenticate</Button>
                      </form>

                      <Button type="ghost" onClick={this.changeForm}>{this.state.loginForm ? (<span>Sign Up</span>) : (<span>Log In</span>)}</Button>
                    </div>
                  )}
            </div>
          </div>
        </div>
        <div id="contacts">
          <ul>{activeChats}</ul>
        </div>
        <div id="bottom-bar">
          {this.props.isAuthenticated ? (
            <Button id="addChat" type="primary" onClick={() => this.openAddChatPopup()}>
              <i className="fa fa-user-plus fa-fw" aria-hidden="true" />
              <span>Create chat</span>
            </Button>
          ) : (<></>)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading,
    token: state.auth.token,
    username: state.auth.username,
    chats: state.message.chats
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (userName, password) =>
      dispatch(actions.authLogin(userName, password)),
    logout: () => dispatch(actions.logout()),
    signup: (username, email, password1, password2) =>
      dispatch(actions.authSignup(username, email, password1, password2)),
    addChat: () => dispatch(navActions.openAddChatPopup()),
    getUserChats: (username, token) =>
      dispatch(messageActions.getUserChats(username, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidepanel);
