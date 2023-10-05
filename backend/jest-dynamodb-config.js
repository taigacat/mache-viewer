module.exports = {
  tables: [
    {
      TableName: 'local-object-table',
      KeySchema: [
        { AttributeName: 'hashKey', KeyType: 'HASH' },
        { AttributeName: 'rangeKey', KeyType: 'RANGE' },
      ],
      AttributeDefinitions: [
        { AttributeName: 'hashKey', AttributeType: 'S' },
        { AttributeName: 'rangeKey', AttributeType: 'S' },
      ],
      TimeToLiveSpecification: {
        AttributeName: 'ttl',
        Enabled: true,
      },
      BillingMode: 'PAY_PER_REQUEST',
    },
  ],
  port: 8001,
};
