import React, { useEffect } from "react";

import BankFormHandler from "./BankFormHandler";
import PSEBFormHandler from "./PSEBFormHandler";
import SECPFormHandler from "./SECPFormHandler";
import FBRFormHandler from "./FBRFormHandler";
import Homepage from "./HomeContent";
import ContactUs from "./ContactUs";

function MainContent({ content }) {
  switch (content) {
    case "Home":
      return <Homepage/>
    case "SECP Registration":
      return <SECPFormHandler />;
    case "FBR Registration":
      return <FBRFormHandler />;
    case "Bank Account Documents":
      return <BankFormHandler />;
    case "PSEB Registration":
      return <PSEBFormHandler />;
    case "Settings":
      return <ContactUs />;
   
    default:
      return <div>No content selected</div>;
  }
}
export default MainContent;
