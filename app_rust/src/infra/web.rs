// use actix_web::{HttpResponse};
//
//
// pub fn index() -> HttpResponse {
//     HttpResponse::Ok().body("Hello world!")
// }
//
// #[cfg(test)]
// mod tests {
//     use super::*;
//     use actix_web::{test, http};
//
//     #[test]
//     fn test_index_ok() {
//         let resp = test::block_on(index()).unwrap();
//         assert_eq!(resp.status(), http::StatusCode::OK);
//         println!("{:?}",resp.status());
//
//         match resp.body().as_ref() {
//             Some(x) => println!("{:?}", x),
//             None => println!("got none")
//         }
//     }
// }
