import React from "react";
import { Form, Button, Input } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as navActions from "../store/actions/nav";
import * as messageActions from "../store/actions/message";
import { HOST_URL } from "../settings";

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalAddChatForm extends React.Component {
  state = {
    chatname: "",
    error: null
  };

  handleChange = event => {
    this.setState({
      chatname: event.target.value
    });
  };

  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${this.props.token}`
        };
        axios
          .post(`${HOST_URL}/chat/create/`, {
            chatname: this.state.chatname,
            messages: [],
            participants: [this.props.username]
          })
          .then(res => {
            this.props.history.push(`/${res.data.id}`);
            this.props.closeAddChatPopup();
            this.props.getUserChats(this.props.username, this.props.token);
          })
          .catch(err => {
            console.error(err);
            this.setState({
              error: err
            });
          });
      }
    });
  };

  render() {
    const {
      getFieldsError,
    } = this.props.form;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        {this.state.error ? `${this.state.error}` : null}

        <Input placeholder="Enter the chat name" value={this.state.chatname} onChange={this.handleChange} />

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Start a chat
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const AddChatForm = Form.create()(HorizontalAddChatForm);

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeAddChatPopup: () => dispatch(navActions.closeAddChatPopup()),
    getUserChats: (username, token) =>
      dispatch(messageActions.getUserChats(username, token))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddChatForm)
);
