import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { CosmosClient, Database, Container } from "@azure/cosmos";

interface IUser {
  id: "string";
  groupID: "string";
  username: "string";
}

const endpoint = "https://ng-girls-hackalearn-db-chara.documents.azure.com:443/";
const key = process.env.DB_KEY;
const db_name = "ng-girls-hackalearn-db-chara";
const collection = process.env.COLLECTION;

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('GetUserInfo function request');

    const client = new CosmosClient({endpoint, key});
    const database = client.database(db_name);
    const container = database.container(collection);

    const query = `SELECT * FROM c WHERE c.groupID = "2"`;
    const groupRes = await container.items.query(query).fetchAll();

    // Fetch data without query
    let itemRes = await container.item("1", "2").read<IUser>();

    if (groupRes.resources.length === 0) {
      context.res = {
        status: 404,
        body: {
          status: 404,
          message: "No items"
        }
      };
      context.done();
      return;
    }

    // context.res = {
    //     // status: 200, /* Defaults to 200 */
    //     body: {
    //       groupRes
    //     }
    // };
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: {
        groupRes,
        item: itemRes.resource
      }
  };

};

export default httpTrigger;
