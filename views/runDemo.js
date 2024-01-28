import React, { useState } from "react";
import { Button } from "@airtable/blocks/ui";
import { demoPayload } from "../controllers/getTable";
import { TablePicker } from "@airtable/blocks/ui";




export const GenerateBasicReport = () => {
    const [table, setTable] = useState(null);
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