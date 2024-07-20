import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";
import { CardGroup,Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css"
import Campaign from "../../ethereum/campaign"
import ContributeForm from "../../components/ContributeForm";
import {Link } from "../../routes"

export async function getServerSideProps(props) {//props through router
  const campaign = Campaign(props.query.address);
  const campaignAddress = props.query.address;


console.log("Address is : "+campaignAddress);

const summary = await campaign.methods.getSummary().call();

console.log("Summary is : " + summary[0]);

  return { props : {minimumContribution : summary[0]?.toString(),
    balance : summary[1]?.toString(),
    requestsCount : summary[2]?.toString(),
    approversCount : summary[3]?.toString(),
    manager : summary[4]?.toString(),
    campaignAdd: campaignAddress?.toString()  
  }


   }; // Pass campaign as props
}


const Show = (props) => {
//   const [account, setAccount] = useState("");
//   const [minBalance, setMinBalance] = useState("");
//   console.log(props.minimumContribution)

//   useEffect(() => {
//     const fetchAccountAndBalance = async () => {
//       try {
//         // setAccount(props.manager);
//         // setMinBalance(props.minimumContribution);
//       } catch (error) {
//         console.error("Error fetching accounts and balance:", error);
//       }
//     };

//     fetchAccountAndBalance();
//   }, []);

  // const [campaignAddress,setCampaignAddress] = useState('');
  let campaignAddress;

const renderCards = () =>{

    const {
        minimumContribution,
        balance,
        requestsCount,
        approversCount,
        manager,
        campaignAdd
    } = props;
    campaignAddress=campaignAdd;
    {console.log(campaignAddress)}
    const items = [
        {
          header: manager,
          meta: 'Address of Manager',
          description:
            'Manager is the creator of this campaign and can send the request',
            style : {overflowWrap : "break-word" , maxWidth : "45%"}
        },
        {
            header:minimumContribution  ,
            meta: 'Minimum Contribution (wei)',
          description:
            'You must contribute at least this amount in wei to become a approver',
            style : {overflowWrap : "break-word" , maxWidth : "45%"}

        },
        {
          header:   requestsCount,
          meta: 'Number of Requests',
          description:
            'A request tries to withdraw money from the Campaign. request can be approved by all the Approvers',
            style : {overflowWrap : "break-word" , maxWidth : "45%"}

        },
        {
            header: approversCount,
            meta: 'Number of Approvers',
            description:
              'The number of people contributed in this Campaign',
            style : {overflowWrap : "break-word" , maxWidth : "45%"}

          },
          {
            header: web3.utils.fromWei(balance,'ether') + " ETH",
            meta: 'Campaign Balance (Ether)',
            description:
              'How much money the campaign had left to spend.',
            style : {overflowWrap : "break-word" , maxWidth : "45%"}

          },
      ]

    // setCampaignAddress(campaignAdd);


      return <CardGroup itemsPerRow={2}  items={items} />;
}


  return (
    <Layout>
      <h2>Campaign Details</h2>
      <div style={{display : "flex"}}>
      {renderCards()}
      <ContributeForm addr={campaignAddress} />
      </div>
      <Link route = {`/campaigns/${campaignAddress}/requests`}><Button type="submit" primary={true} style={{marginTop:"3%"}}>
            View Requests
          </Button>
          </Link>
    </Layout>
  );
};

export default Show;
