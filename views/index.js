import {initializeBlock} from '@airtable/blocks/ui';
import { Box } from "@airtable/blocks/ui";
import React from 'react';
import { GenerateBasicReport } from "./runDemo"


function HelloWorldApp() {
    // YOUR CODE GOES HERE
    return <div>
    <Box
    border="default"
    backgroundColor="white"
    padding={0}
    width={200}
    height={200}
    overflow="hidden"
  >


    <GenerateBasicReport />
 
  </Box>
    </div>;
}

initializeBlock(() => <HelloWorldApp />);
