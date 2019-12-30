use crate::domain::entities::{Point, Trace};
use crate::domain::usecase::PointService;
use crate::domain::Repository;
use actix_web::{web, App, Responder};

async fn index() -> impl Responder {
    "Hello world!"
}

// use crate::infra::database::{Postgresql};
//
//
// pub fn find_all_traces() -> Vec<Trace> {
//     let mut uc = Postgresql::new();
//     uc.all_traces()
// }
