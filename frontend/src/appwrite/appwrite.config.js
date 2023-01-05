import { Client, Account } from "appwrite";
import setup from "./setup";

const client = new Client();

client.setEndpoint("http://localhost/v1").setProject(setup.PROJECT_ID);

export const account = new Account(client);
