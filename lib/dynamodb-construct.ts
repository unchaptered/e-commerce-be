// CloudFormation Dependency
import { Construct } from 'constructs';

// CDK Dependencies
import { RemovalPolicy } from 'aws-cdk-lib';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';

export class DynamoDBConstruct extends Construct {

    public readonly productTable: Table;
    public readonly basketTable: Table;
    constructor(scope: Construct, id: string) {
        super(scope, id);

        // product : PK: id -- name - description - imageFile - price - category
        this.productTable = new Table(this, 'product', {
            partitionKey: {
                name: 'id',
                type: AttributeType.STRING
            },
            tableName: 'product',
            removalPolicy: RemovalPolicy.DESTROY,
            billingMode: BillingMode.PAY_PER_REQUEST
        });

        // basket : PK: id - username - basektItemList[]
        // basketItem : { quantity - color - price - productId - productName }
        this.basketTable = new Table(this, 'basket', {
            partitionKey: {
                name: 'username',
                type: AttributeType.STRING
            },
            tableName: 'basket',
            removalPolicy: RemovalPolicy.DESTROY,
            billingMode: BillingMode.PAY_PER_REQUEST
        });
    }

}