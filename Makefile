.PHONY: all build run dev clean

BINARY_NAME=desktop-widget
BIN_PATH=build/bin/$(BINARY_NAME)

all: build

build:
	@export PATH=$$PATH:$$(go env GOPATH)/bin; \
	wails build -tags webkit2_41

run: build
	@./$(BIN_PATH)

dev:
	@export PATH=$$PATH:$$(go env GOPATH)/bin; \
	wails dev -tags webkit2_41

clean:
	@rm -rf build/bin
