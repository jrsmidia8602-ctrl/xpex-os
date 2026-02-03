FROM rust:latest as builder
WORKDIR /usr/src/xpex-kernel
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
COPY --from=builder /usr/src/xpex-kernel/target/release/xpex-kernel /usr/local/bin/xpex-kernel
EXPOSE 8080
CMD ["/usr/local/bin/xpex-kernel"]
