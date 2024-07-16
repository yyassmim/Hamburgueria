import { Router } from "express";

import { v4 } from "uuid";

import User from "./app/models/user";

const routes = new Router()

routes.get('/', async (request, response) => {
 const user = await User.create({
  id: v4(),
  name : "Yasmim",
  email: "yaasmimaparecida@gmail.com",
  password_hash: "abcde"
 })

 return response.status(201).json(user);

});

 export default routes;
