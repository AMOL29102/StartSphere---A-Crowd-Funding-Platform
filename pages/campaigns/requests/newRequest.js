import React from "react";
import Layout from "../../../components/Layout";
import { Form,FormField,Input,Message,MessageHeader,Button} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useState } from "react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import {Router} from "../../../routes";



export async function getServerSideProps(props){//from router
    // console.log("Inside new Request : "+props.query.address);
    return {props:{address:props.query.address}};
}

const newRequest = (props) =>{
    const [errorMessage,setErrorMessage] = useState('');
    const [Description,setDescription] = useState('');
    const [Amount,setAmount] = useState();
    const [Receipient,setReceipient] = useState('');
    const [loader,setLoader] = useState(false);

    const handleSubmit =async (e) =>{
        e.preventDefault();
        const campaign = Campaign(props.address);
        try{
            setLoader(true);
            setErrorMessage('');
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(Description,web3.utils.toWei(Amount,'ether'),Receipient).send({
                from:accounts[0]
            });
            Router.replaceRoute(`/campaigns/${props.address}/requests`);

        }catch(err){
            setErrorMessage(err.message);
            console.log(err.message);
        }
        setLoader(false);
    }

    const handleDescription = (e) =>{
        setDescription(e.target.value);

    }

    const handleAmount = (e) =>{
        setAmount(e.target.value);

    }
    const handleRecepient = (e) =>{
        setReceipient(e.target.value);
    }
 
    return (

        <>
        <Layout>
            <h1>Create A Request</h1>

            <Form onSubmit={handleSubmit} error={errorMessage!=''}>
                <FormField>
                    <label>Description</label>
                    <Input 
                        placeholder="Description of Request"
                        onChange={handleDescription}
                        value={Description}   
                    />
                </FormField>

                

                <FormField>
                    <label>Amount in Ether</label>
                    <Input 
                        label='Ether'
                        labelPosition="right"
                        placeholder="Amount Required"
                        onChange={handleAmount}
                        value={Amount}   
                    />
                </FormField>

                

                <FormField>
                    <label>Receipient</label>
                    <Input 
                        placeholder="Receipient's Address"
                        onChange={handleRecepient}
                        value={Receipient}   
                    />
                </FormField>


                <Message error>

                    <MessageHeader>Error</MessageHeader>
                    {errorMessage.charAt(errorMessage.length-1) == 'd' || errorMessage.charAt(errorMessage.length-1) == 't' ||  errorMessage.charAt(errorMessage.length-1) == 'n'?<p>Please Enter Correct value in input ...</p>:errorMessage.charAt(errorMessage.length-1) == '.'?<p>Transaction Rejected by user...</p>:<p>Unexpected error occured...</p>}

                </Message>

            <Button type="submit" primary loading={loader}> Create </Button>
            </Form>

            

        </Layout>
        </>
    )
}

export default newRequest;