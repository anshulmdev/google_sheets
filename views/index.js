import { initializeBlock, Loader, Box } from '@airtable/blocks/ui';
import React, { useState, useEffect } from 'react';
import { GenerateBasicReport } from "./runDemo";
import { setGlobalVariables } from "../controllers/globalConfig";

function HelloWorldApp() {
    const [data, updateData] = useState();
    useEffect(() => {
        const getData = async () => {
            const setInitialVariables = await setGlobalVariables();
            updateData(setInitialVariables);
        }
        getData();
      }, []);

    return <div>
        {data ? <GenerateBasicReport />: 
          <Box paddingLeft={5} paddingTop={5} display="flex" justifyContent="flex-center" alignIt2ms="center">
            <Loader scale={0.3} />
          </Box>
          }
    </div>;
}

initializeBlock(() => <HelloWorldApp />);

