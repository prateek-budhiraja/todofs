import { Client, Account, Databases } from "appwrite";

const client = new Client();

client.setEndpoint("http://localhost/v1").setProject("63b002241882beadcc0e");

export const account = new Account(client);
