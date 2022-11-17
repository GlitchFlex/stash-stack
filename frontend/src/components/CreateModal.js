import { Modal, Form, Input, Button, message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CreateModal = ({createModalIsOpen, setCreateModalIsOpen}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

  const handleCancel = ()=>{
    setCreateModalIsOpen(false);
  }  
  
  const { TextArea } = Input;

  const onFinish = (values)=>{
    const dataObj = {...values}
    console.log(dataObj)
    axios({
        method: "POST",
        url: `${process.env.REACT_APP_NOTERAPP_BACKEND}/notes`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        data: dataObj,
    }).then(() => {
        console.log("New Note Added");
        // navigate("/dashboard");
        message.success(`Stashed Successfully`)
        setCreateModalIsOpen(false)
        window.location.reload(true)
    });
  }


  return (
      <div>
          <Modal
              title="Create Note"
              footer = {false}
              open={createModalIsOpen}
              onCancel={handleCancel}
          >
              <Form 
              onFinish = {onFinish}
              name="createStash"
              >
                  <Form.Item name = "title" required>
                    <Input  style = {{fontSize : "2rem", color : "grey"}} bordered = {false} placeholder="Title" />
                  </Form.Item>
                  <Form.Item name = "content" required>
                    <TextArea style = {{color : "grey", resize : "none"}}bordered = {false} rows={4} placeholder="Scribble here..." />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 19, span: 16 }}>
                      <Button type="primary" htmlType="submit">
                          Submit
                      </Button>
                  </Form.Item>
              </Form>
          </Modal>
      </div>
  );
}

export default CreateModal