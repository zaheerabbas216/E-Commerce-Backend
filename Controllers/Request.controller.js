const createError = require("http-errors");

const Request = require("../Models/Request.model");

module.exports = {
  createRequest: async (req, res, next) => {
    try {
      const result = req.body;
      const request = new Request(result);
      const savedRequest = await request.save();
      res.send(savedRequest);
    } catch (error) {
      next(error);
    }
  },

  getAllRequests: async (req, res, next) => {
    try {
      Request.find((err, doc) => {
        if (!err) {
          res.send(doc);
        } else {
          console.log("no doc found!!");
        }
      });
    } catch (error) {
      next(error);
    }
  },

  getRequestById: async (req, res, next) => {
    try {
      Request.findById(req.params.id, (err, doc) => {
        if (!err) {
          res.send(doc);
        } else {
          console.log("error getting the request!!");
        }
      });
    } catch (error) {
      next(error);
    }
  },
};
