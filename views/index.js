import {initializeBlock} from '@airtable/blocks/ui';
import { Box } from "@airtable/blocks/ui";
import React from 'react';
import { GenerateBasicReport } from "./runDemo"


function HelloWorldApp() {
    // YOUR CODE GOES HERE
    return <div>


    <GenerateBasicReport />
 
    </div>;
}

initializeBlock(() => <HelloWorldApp />);

