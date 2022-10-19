FROM golang:alpine AS builder

# Set necessary environmet variables needed for our image
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

# Move to working directory /build
WORKDIR /build

# Copy and download dependency using go mod
COPY go.mod .
COPY go.sum .
RUN go mod download

# Copy the code into the container
COPY ./golang-app/ ./golang-app/

# TODORun test
#RUN go test ./...

# Build the application
RUN go build -o main ./golang-app/cmd/filesearch-worker

# Move to /dist directory as the place for resulting binary folder
WORKDIR /dist

# Copy binary from build to main folder
RUN cp /build/main .

############################
# STEP 2 build a small image
############################
FROM scratch

COPY --from=builder /dist/main /
COPY ./golang-app/bin/config.docker.json /config.json

# Command to run the executable
ENTRYPOINT ["/main"]