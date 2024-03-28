import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export const handler = async function (event, context, callback) {

  const command = new ScanCommand({
    TableName: "pets",
  });

  const response = await client.send(command);

  let mappedItems = [];

  response.Items.forEach(function (item) {
    mappedItems.push({ "petId": item.petID.S, "name": item.name.S, "type": item.type.S });
  });

  mappedItems.sort((a, b) => (a.petId > b.petId) - (a.petId < b.petId));

  return mappedItems;
};