const PROTO_PATH = __dirname + "/proto/contact.proto";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const _ = require("lodash");

let packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

let contact_proto = grpc.loadPackageDefinition(packageDefinition).contact;
let { contacts } = require("./data.js");

function getDetails(call, callback) {
  callback(null, {
    message: _.find(contacts, { id: call.request.id }),
  });
}

function main() {
  let server = new grpc.Server();
  server.addService(contact_proto.Contact.service, { getDetails: getDetails });
  server.bind("0.0.0.0:4500", grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
