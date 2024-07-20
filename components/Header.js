import React from "react";
import { Menu, MenuMenu, MenuItem ,Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import {Link} from "../routes";

const Header = () => {
  return (
    <>
      <Menu style={{"marginTop":"5%"}}>
      <Link href="/" className="item">CrowdCoin</Link>

        {/* <MenuItem name="submit">Submit</MenuItem> */}

        <MenuMenu position="right" icon>
          <MenuItem name="CreatenewCampaign">Create  new Campaign</MenuItem>

        <Link href="/campaigns/New" className="item"> <Icon name="plus" /> </Link> 
        </MenuMenu>
      </Menu>
    </>
  );
};

export default Header;
