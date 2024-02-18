import { Modal, Button, Form, Input, message } from "antd";
import axios from "axios";
import Countdown from "react-countdown";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextArea from "antd/es/input/TextArea";

const ForgetPasswordModal = (props) => {
  const { isModalOpen, setIsModalOpen, modalInputPre, imageUrl, promptIndex } = props;
  const backendURL = "http://localhost:3000";

  const [modalInput, setModalInput] = useState(modalInputPre);
  const [modaTitle, setModalTitle] = useState("Enter your Email");
  const [modalState, setModalState] = useState("email");
  const [loading, setLoading] = useState(false);

  const resetModal = () => {
    setLoading(false);
    setModalInput("");
    setIsModalOpen(false);
    setModalTitle("Enter your Prompt");
    setModalState("email");
  };


  const handleForgetEmailOk = async () => {

    const fetchData = async () => {
        try {
          const url = "http://10.100.161.49:3000/api/edit-image";
          const response = await axios.post(url, {
            "text" : modalInput,
            "imageLink": imageUrl,
            "promptIndex": promptIndex
        });
          setData(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();

    setIsModalOpen(false);
  };

  useEffect(() => {
    setModalInput(modalInputPre)
  }, [modalInputPre]);

  return (
    <Modal
      open={isModalOpen}
      title={modaTitle}
      footer={[]}
      onCancel={() => {setIsModalOpen(false)}}
    >
        
       
      <TextArea cols={4}
        value={modalInput}
        onChange={(e) => {
          setModalInput(e.target.value);
        }}
      />
      <Button style={{marginTop: "10px"}} onClick={handleForgetEmailOk}>Submit</Button>
      <Button style={{marginTop: "10px", marginLeft: "10px"}} onClick={() => setIsModalOpen(false)}>Cancel</Button>
    
    </Modal>
  );
};

ForgetPasswordModal.propTypes = {
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
};

export default ForgetPasswordModal;