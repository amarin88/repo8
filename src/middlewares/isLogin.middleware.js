import { request, response } from "express";

export const isLogin = async (req = request, res = response, next) => {

  if(req.session.user) {
    next();
  } else {
    res.status(401).json({ status: 401, response: "User not logged"});
  }
  
}