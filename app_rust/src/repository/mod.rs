pub trait ModelRepository<T> {
    fn all(&mut self) -> Vec<T>;
    fn bulk_insert(&mut self, rows: &[T]) -> u64;
    fn clear(&mut self);
}
