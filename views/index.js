import { initializeBlock, Loader } from '@airtable/blocks/ui';
import React, { useState, useEffect } from 'react';
import { GenerateBasicReport } from "./runDemo";
import { setGlobalVariables } from "../controllers/globalConfig";

function HelloWorldApp() {
    const [data, updateData] = useState();
    useEffect(() => {
        const getData = async () => {
            console.log("Effect is running")
            const setInitialVariables = await setGlobalVariables();
          updateData(setInitialVariables);
        }
        getData();
      }, []);

    return <div>
        {data ? <GenerateBasicReport />: <Loader scale={0.3} />}
    </div>;
}

initializeBlock(() => <HelloWorldApp />);

