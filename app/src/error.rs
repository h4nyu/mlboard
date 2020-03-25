use failure::Fail;

#[derive(Debug, Fail)]
pub enum ErrorKind {
    #[fail(display = "TraceNotFound")]
    TraceNotFound,
}
