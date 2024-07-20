import React from "react";
import { useState } from "react";
import {
  Form,
  FormField,
  Button,
  Input,
  MessageHeader,
  Message,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import {Router} from "../routes";


const ContributeForm = (props) => {
  const [contributedMoney, setContributedMoney] = useState();
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    // setLoader(true);
    event.preventDefault();
    console.log("Inside handleSubmit." + props.addr);
    try {
        setLoader(true);
        setErrorMessage('');
        const accounts = await web3.eth.getAccounts();
        const campaign = Campaign(props.addr);
        await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(`${contributedMoney}`,'ether'),
    });

    Router.replaceRoute(`/campaigns/${props.addr}`);
    setErrorMessage('');
    
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message);
    }
    setLoader(false);
    
  };

  const handleContributionInput = (event) => {
    setContributedMoney(event.target.value);
    console.log("Contributed value : " + contributedMoney);
  };
  return (
    <>
      <Form onSubmit={handleSubmit} error={errorMessage != ""}>
        <FormField>
          <label>Contribute Money Here!</label>
          <Input
            label="ether"
            labelPosition="right"
            placeholder="Contributed amount"
            onChange={handleContributionInput}
            value={contributedMoney}
            required
          />
        </FormField>

        <Message error>
          <MessageHeader>Error in Creating Campaign

          </MessageHeader>
          {/* <p>{errorMessage}</p>  */}
          {/* {console.log(errorMessage)} */}

          {errorMessage.charAt(errorMessage.length-1) == 'n' ||errorMessage.charAt(errorMessage.length-1) == 't'?<p>Please Enter Correct value in input ...</p>:errorMessage.charAt(errorMessage.length-2) == 'e'?<p>Transaction Rejected by user...</p>:<p>Unexpected error occured...</p>}

          
        </Message>
        <Button type="submit" primary={true} loading={loader}>
          Contribute
        </Button>
      </Form>
    </>
  );
};

export default ContributeForm;
