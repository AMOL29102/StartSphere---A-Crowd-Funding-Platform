import React from "react";
import { Table, TableRow, TableCell, Button } from "semantic-ui-react";
import web3 from "../../../ethereum/web3";
import Campaign from "../../../ethereum/campaign";
import { useState } from "react";
import {Router} from "../../../routes";


const RequestRow = (props) => {
    const checkFinalised = props.request.complete;
    const readytoFinalise = props.request.countVotedYes >= (props.contributersCount/2); 
    const [Aloader,setAloader] = useState(false);
    const [Floader,setFloader] = useState(false);


  const handleApprove = async () => {
    console.log("Inside handleApprove");


    try {
        setAloader(true);
       
      const campaign = Campaign(props.address);
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.approveRequest(props.id).send({
        from: accounts[0],
      });
      Router.replaceRoute(`/campaigns/${props.address}/requests`);

    } catch (err) {console.log(err)}

    setAloader(false);
  };

  const handleFinalise =async () => {
    console.log("Inside handleFinalise");
 
    console.log(props.address);



    try {
        setFloader(true);
        const campaign = Campaign(props.address);
        const accounts = await web3.eth.getAccounts();
  
        await campaign.methods.finalizeRequest(props.id).send({
          from: accounts[0],
        });
        Router.replaceRoute(`/campaigns/${props.address}/requests`);
      } catch (err) {console.log(err)}
      setFloader(false);

  };
  return (
    <>
      <TableRow disabled={props.request.complete} style={(readytoFinalise && !props.request.complete) ? {backgroundColor:
        "lightgreen"}:{}}>
        <TableCell>{props.id + 1}</TableCell>
        <TableCell>{props.request.description}</TableCell>
        <TableCell>
          {web3.utils.fromWei(props.request.value, "ether")}
        </TableCell>
        <TableCell>{props.request.receipient}</TableCell>
        <TableCell>
          {props.request.countVotedYes}/{props.contributersCount}
        </TableCell>
        <TableCell>
          {props.request.complete ? null : 
            (<Button color="blue" basic onClick={handleApprove} loading={Aloader}>
            Approve
          </Button>)
          }
        </TableCell>
        <TableCell>
          { props.request.complete ? null :
            <Button color="green"  onClick={handleFinalise} loading={Floader}>
            Finalise
          </Button>}
        </TableCell>
      </TableRow>
    </>
  );
};

export default RequestRow;
