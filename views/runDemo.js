import React, { useState } from "react";
import {base} from '@airtable/blocks';
import { Button } from "@airtable/blocks/ui";
import { demoPayload } from "../controllers/getTable";
import { TablePicker } from "@airtable/blocks/ui";




export const GenerateBasicReport = () => {
    const [table, setTable] = useState(base.tables[0]);
    return (
        <div>
            <TablePicker
                table={table}
                onChange={newTable => setTable(newTable)}
                width="320px"
            />
            <Button onClick={() => demoPayload(table)} icon="edit">
                Generate Excel Report
            </Button>

        </div>
    )
}