
import {globalConfig} from '@airtable/blocks';




export const setGlobalVariables = async () => {
    await globalConfig.setAsync('progress', 0.0);
    await globalConfig.setAsync('credits', 9000);
}