use failure::Error;
use app::infra::database::create_connection_pool;
use serde_json::json;
use lapin::{
    options::*, types::FieldTable, BasicProperties, Connection,
    ConnectionProperties
};
use app::infra::web::WorkspaceDelete;

use serde_json::Value;
use futures::future::join_all;
use app::usecase::*;

#[tokio::main]
async fn main() -> Result<(), Error> {
    let conn = Connection::connect("amqp://mq:5672/%2f", ConnectionProperties::default())
        .await?;
    let channel = conn.create_channel().await?;
    let queue = channel.queue_declare("my_first_queue", QueueDeclareOptions::default(), FieldTable::default()).await?;
    let pool = create_connection_pool().unwrap();
    let consumer = channel
        .basic_consume(
            &queue,
            "my_consumer",
            BasicConsumeOptions::default(),
            FieldTable::default(),
        )
        .await?;
    let conn = pool.get().await?;
    for delivery in consumer{
        let delivery = delivery?;
        println!("{:?}", delivery.data);
        let v: WorkspaceDelete = serde_json::from_slice(&delivery.data)?;
        println!("{:?}",v);
        println!("start{:?}", delivery.delivery_tag);
        delete_workspace(&conn, &v.id).await?;
        channel.basic_ack(delivery.delivery_tag, BasicAckOptions::default());
        println!("end{:?}", delivery.delivery_tag);
    };
    Ok(())
}
