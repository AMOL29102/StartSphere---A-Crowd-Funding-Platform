import React from "react";
import Layout from "../../../components/Layout";
import {
  Grid,
  Button,
  GridColumn,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "./RequestRow";


export async function getServerSideProps(props) {
  //How to access one by one request
  // console.log("address in req is : "+props.query.address);
  // const len = Number(lenBig);
  // const Req = await campaign.methods.requests(len-1).call();
  // // console.log("Desc : "+desc.description);
  // const desc = Req.description;

  const campaign = Campaign(props.query.address);
  const requestCount = await campaign.methods.getRequestsCount().call();
  

  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map(async (element, index) => {
        const request = await campaign.methods.requests(index).call();

        const convertedRequest = {};
        for (let key in request) {
          if (typeof request[key] === "bigint") {
            convertedRequest[key] = request[key].toString();
          } else {
            convertedRequest[key] = request[key];
          }
        }
        return convertedRequest;
      })
  );

  // console.log(requests);


  const contributersCount =await campaign.methods.approversCount().call();
  return {
    props: {
      address: props.query.address,
      requests: JSON.stringify(requests),
      requestCount: requestCount.toString(),
      contributersCount:contributersCount.toString()
    },
  };
}

const requestsList = (props) => {

  const renderRow = () => {
    const requests = JSON.parse(props.requests);
    
    return requests.map((request,index)=>{
      return (
        <RequestRow  
          key={index}
          id={index}
          request={request}
          address={props.address}
          contributersCount={props.contributersCount}
        />
      )
    })
    
  };
  return (
    <>
      <Layout>
        <Grid>
          <GridColumn floated="left" width={5}>
            <h2>View the requests List</h2>
          </GridColumn>
          <GridColumn floated="right" width={3}>
            <Link route={`/campaigns/${props.address}/requests/new`}>
              {" "}
              <Button primary style={{ marginLeft: "33%" }}>
                {" "}
                Add Request{" "}
              </Button>{" "}
            </Link>
          </GridColumn>
        </Grid>

        {/* {console.log("Request object : "+typeof  JSON.parse(props.requests)[0].value)} */}

        <Table celled>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Receipient</TableHeaderCell>
              <TableHeaderCell>Approval Count</TableHeaderCell>
              <TableHeaderCell>Approve</TableHeaderCell>
              <TableHeaderCell>Finalise</TableHeaderCell>
            </TableRow>
          </TableHeader>


          <TableBody>

      {renderRow()}

      </TableBody>
        </Table>

        <div>Found {props.requestCount} requests</div>
      </Layout>
    </>
  );
};

export default requestsList;
