const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const logger = require('./logger');

const { hipstershop } = grpc.loadPackageDefinition(
  protoLoader.loadSync(path.join(__dirname, 'proto/demo.proto'), {
    keepCase: true, longs: String, enums: String, defaults: true, oneofs: true
  })
);

let client;

// Fire-and-forget: a failed MarkPaid is logged and never fails the charge.
module.exports = function markPaid (orderId, transactionId) {
  const addr = process.env.CHECKOUT_SERVICE_ADDR;
  if (!addr) { return logger.warn('CHECKOUT_SERVICE_ADDR not set, skipping MarkPaid'); }
  client = client || new hipstershop.CheckoutService(addr, grpc.credentials.createInsecure());
  client.markPaid({ order_id: orderId, transaction_id: transactionId }, (err) => {
    if (err) { logger.warn(`CheckoutService#MarkPaid failed for order ${orderId}: ${err.message}`); }
  });
};
