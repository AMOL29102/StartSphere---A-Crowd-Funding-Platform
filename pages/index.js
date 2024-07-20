import React, { useState, useEffect } from "react";
import factory from "../ethereum/factory";
import { CardGroup,Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useRouter } from 'next/router';  
import Layout from "../components/Layout";
import {Link} from "../routes";


export async function getServerSideProps() {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return {props : {campaigns}  }; // Pass campaigns as props
}


const CampaignList = ({ campaigns }) => {
  // const [renderedCampaigns, setRenderedCampaigns] = useState([]); // State for campaigns

  // useEffect(() => {
  //   // setRenderedCampaigns(campaigns); // Update state with fetched campaigns
  //   console.log(campaigns[0] + " hello boss");
  // }, [campaigns]); // Run useEffect only when props change

  //Do the routing usiing function
  // const router = useRouter();
  // const handleNav = () =>{

 
  //     router.push('/newCampaign');

  // }
  
const renderCampaigns = () =>{

  // <style>
  //   .Cards{
  //     border = "10px solid black"
  //   }
  // </style>
  const items = campaigns.map(address => {
    return {
      header : "Address of Campaign : " + address , 
      description :(<Link route={`/campaigns/${address}`}  > View Campaign </Link>),
      fluid : true,
      style : {color : "red",border : "10px solid red ",backgroundColor : "yellow"}
    }
  })

  return <CardGroup centered className="Cards" items= {items} />
}


const handleCreateCampaign = () =>{

}

  return (
    <div>
 
    <Layout>
      <h3>Open Campaigns</h3>
      <hr />
      {/* {renderedCampaigns.map((campaign) => (
        <h2 key={campaign}>Campaign: {campaign}</h2> // Use unique key for each campaign
      ))} */}

      <h2>Campaigns address are :</h2>
      <hr></hr>

      {/* with custom css */}
      {/* <div style={{"display":"flex","width":"100%"}}>
        <div style={{"width":"50%"}}>{renderCampaigns()}</div>
        <Button style={{"width":"14%","height":"10%","left":"30%","margin-top":"3%"}}  content='Create Campaign' icon='plus' labelPosition='right' primary={true} />
      </div> */}


   <Link  href={'/campaigns/New'} > <Button floated="right" content='Create Campaign' icon='plus' labelPosition='right' primary={true} /> </Link>
      <div>{renderCampaigns()}</div>
      </Layout>
    </div>
  );
};

export default CampaignList;
