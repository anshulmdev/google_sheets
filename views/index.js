import {initializeBlock} from '@airtable/blocks/ui';
import React from 'react';
import { GenerateBasicReport } from "./runDemo";
import { setGlobalVariables } from "../controllers/globalConfig";

function HelloWorldApp() {

    setGlobalVariables();
    return <div>

    <GenerateBasicReport />
 
    </div>;
}

initializeBlock(() => <HelloWorldApp />);

