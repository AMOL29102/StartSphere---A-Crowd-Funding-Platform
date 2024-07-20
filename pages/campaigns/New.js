import React from "react";
import { useState } from "react";
import Layout from "../../components/Layout";
import "semantic-ui-css/semantic.min.css";
import {
  Form,
  FormField,
  Button,
  Input,
  MessageHeader,
  Message,
} from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

const New = () => {
  const [minContribution, setMinContribution] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loader,setLoader] = useState(false);

  const handleMinContribution = (event) => {
    setMinContribution(event.target.value);
    console.log(minContribution);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoader(true);
        setErrorMessage('');
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minContribution).send({
        from: accounts[0],
      });
      
      Router.pushRoute('/');
      
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoader(false);
    console.log(minContribution);
  };
  return (
    <>
      <Layout>
        <h3>Create new Campaign</h3>

        <Form onSubmit={handleSubmit} error = {errorMessage!=''}>
          <FormField>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              placeholder="Min Contribution in Wei"
              onChange={handleMinContribution}
              value={minContribution}
            />
          </FormField>

          <Message error>
            <MessageHeader>
              Error in Creating Campaign
            </MessageHeader>
            {errorMessage.charAt(errorMessage.length-1) == 'n'?<p>Please Enter Correct value in input ...</p>:errorMessage.charAt(errorMessage.length-2) == 'e'?<p>Transaction Rejected by user...</p>:<p>Unexpected error occured...</p>}
            {/* <p>{errorMessage.message}</p> */}
            {/* {console.log(errorMessage)} */}
            
            
          </Message>
          <Button type="submit" primary={true} loading={loader}>
            Create
          </Button>
        </Form>
      </Layout>
    </>
  );
};

export default New;
