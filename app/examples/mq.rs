use failure::Error;
use app::infra::database::create_connection_pool;
use deadpool_postgres::{Pool};
use serde_json::json;
use lapin::{
    options::*, types::FieldTable, BasicProperties, Connection,
    ConnectionProperties
};
use app::infra::web::{WorkspaceDelete, PointAddScalars};

use serde_json::Value; use futures::join;
use app::usecase::*;

async fn consume_delete_workspace(mq_conn: &Connection, db_pool:&Pool ) -> Result<(), Error> {
    let channel = mq_conn.create_channel().await?;
    let queue = channel.queue_declare("delete_workspace", QueueDeclareOptions::default(), FieldTable::default()).await?;
    let consumer = channel
        .basic_consume(
            &queue,
            "consumer",
            BasicConsumeOptions::default(),
            FieldTable::default(),
        )
        .await?;
    let db_conn = db_pool.get().await?;
    for delivery in consumer{
        let delivery = delivery?;
        let v:WorkspaceDelete = serde_json::from_slice(&delivery.data)?;
        delete_workspace(&db_conn, &v.id).await?;
        channel.basic_ack(delivery.delivery_tag, BasicAckOptions::default());
        println!("delete_workspace{:?}", delivery.delivery_tag);
    };
    Ok(())
}

async fn consume_add_scalars(mq_conn: &Connection, db_pool:&Pool ) -> Result<(), Error> {
    let channel = mq_conn.create_channel().await?;
    let queue = channel.queue_declare("add_scalars", QueueDeclareOptions::default(), FieldTable::default()).await?;
    let consumer = channel
        .basic_consume(
            &queue,
            "consumer",
            BasicConsumeOptions::default(),
            FieldTable::default(),
        )
        .await?;
    let db_conn = db_pool.get().await?;
    for delivery in consumer{
        let delivery = delivery?;
        let v:PointAddScalars = serde_json::from_slice(&delivery.data)?;
        add_scalars(&db_conn, &v.values, &v.ts).await?;
        channel.basic_ack(delivery.delivery_tag, BasicAckOptions::default());
        println!("add_scalars{:?}", delivery.delivery_tag);
    };
    Ok(())
}


#[tokio::main]
async fn main() -> Result<(), Error> {
   
    let conn = Connection::connect("amqp://mq:5672/%2f", ConnectionProperties::default()).await?;
    let db_pool = create_connection_pool()?;

    join!(
        consume_add_scalars(&conn, &db_pool),
        consume_add_scalars(&conn, &db_pool),
        consume_add_scalars(&conn, &db_pool),
        consume_add_scalars(&conn, &db_pool),
        consume_add_scalars(&conn, &db_pool),
        consume_add_scalars(&conn, &db_pool),
        consume_add_scalars(&conn, &db_pool),
        consume_add_scalars(&conn, &db_pool),
        consume_add_scalars(&conn, &db_pool),
        consume_add_scalars(&conn, &db_pool),
        consume_add_scalars(&conn, &db_pool),
        consume_add_scalars(&conn, &db_pool),
        consume_add_scalars(&conn, &db_pool),
        consume_delete_workspace(&conn, &db_pool),
    );
// ,consume_delete_workspace(&conn, &db_pool)
    Ok(())
}
