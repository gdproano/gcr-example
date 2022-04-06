const PROTO_PATH = __dirname + "/proto/contact.proto";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

let packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
let contact_proto = grpc.loadPackageDefinition(packageDefinition).contact;

function main() {
  let client = new contact_proto.Contact(
    "localhost:4500",
    grpc.credentials.createInsecure()
  );

  let contactId;
  if (process.argv.length >= 3) {
    contactId = process.argv[2];
  } else {
    contactId = 1;
  }
  client.getDetails({ id: contactId }, function (err, response) {
    console.log(
      "Contact Details for Contact Id:",
      contactId,
      "\n",
      response.message
    );
  });
}

main();
