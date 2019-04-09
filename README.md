# opwire-agent: sample command line in Nodejs

<!-- TOC -->

- [Installation](#installation)
  - [Checkout source code](#checkout-source-code)
  - [Download `opwire-agent`](#download-opwire-agent)
- [Call the service from browsers](#call-the-service-from-browsers)
- [Test the service with `curl`](#test-the-service-with-curl)
  - [Default data format (`json`)](#default-data-format-json)
    - [Valid input (a JSON object)](#valid-input-a-json-object)
    - [Invalid input (not a JSON object)](#invalid-input-not-a-json-object)
  - [JSON input, plaintext output](#json-input-plaintext-output)
    - [Valid input (a JSON object)](#valid-input-a-json-object-1)
    - [Invalid input (not a JSON object)](#invalid-input-not-a-json-object-1)
- [Contributing](#contributing)
- [License](#license)

<!-- /TOC -->

## Installation

### Checkout source code

Clone example source code from github repository:

```shell
git clone https://github.com/opwire/sample-cmdline-node.git
```

Change the project home to current working directory:

```shell
cd sample-cmdline-node
```

Install dependencies:

```shell
npm install
```

### Download `opwire-agent`

To download the latest `opwire-agent` on Linux/macOS/BSD systems, run:

```shell
curl https://opwire.org/opwire-agent/install.sh | bash
```

For other systems:

* Download the relevant [`opwire-agent`](https://github.com/opwire/opwire-agent/releases/latest) release,
* Extract the `opwire-agent` or `opwire-agent.exe` binary from the archive to example folder (current directory).

![project-home-dir](https://raw.github.com/opwire/sample-cmdline-node/master/docs/assets/images/ls.png)

## Call the service from browsers

Execute the following command:

```shell
./opwire-agent serve -p=8888 --default-command="node example.js"
```

Open this URL `http://localhost:8888/$?type=microservice&type=nodejs`:

![example-output](https://raw.github.com/opwire/sample-cmdline-node/master/docs/assets/images/example.png)


## Test the service with `curl`

### Default data format (`json`)

Execute the following command:

```shell
./opwire-agent serve -p=8888 --default-command="node example.js"
```

#### Valid input (a JSON object)

Make a HTTP request with `curl`:

```curl
curl -v \
  --request POST \
  --url 'http://localhost:8888/$?type=microservice&type=nodejs' \
  --data '{
  "name": "Opwire",
  "url": "https://opwire.org/"
}'
```

Result:

```plain
> POST /$?type=microservice&type=nodejs HTTP/1.1
> User-Agent: curl/7.35.0
> Host: localhost:8888
> Accept: */*
> Content-Length: 52
> Content-Type: application/x-www-form-urlencoded
>
* upload completely sent off: 52 out of 52 bytes
< HTTP/1.1 200 OK
< Content-Type: text/plain
< X-Exec-Duration: 0.111771
< Date: Wed, 13 Mar 2019 06:57:04 GMT
< Content-Length: 450
<
{
  "OPWIRE_REQUEST": {
    "header": {
      "Accept": [
        "*/*"
      ],
      "Content-Length": [
        "52"
      ],
      "Content-Type": [
        "application/x-www-form-urlencoded"
      ],
      "User-Agent": [
        "curl/7.35.0"
      ]
    },
    "query": {
      "type": [
        "microservice",
        "nodejs"
      ]
    },
    "params": null
  },
  "input": {
    "name": "Opwire",
    "url": "https://opwire.org/"
  }
}
```

#### Invalid input (not a JSON object)

Make a HTTP request with `curl`:

```curl
curl -v \
  --request POST \
  --url 'http://localhost:8888/$?type=microservice&type=nodejs' \
  --data 'Not a JSON object'
```

Result:

```plain
> POST /$?type=microservice&type=nodejs HTTP/1.1
> User-Agent: curl/7.35.0
> Host: localhost:8888
> Accept: */*
> Content-Length: 17
> Content-Type: application/x-www-form-urlencoded
>
* upload completely sent off: 17 out of 17 bytes
< HTTP/1.1 500 Internal Server Error
< Content-Type: text/plain
< X-Error-Message: exit status 1
< Date: Wed, 13 Mar 2019 07:17:05 GMT
< Content-Length: 550
<
{
  "name": "SyntaxError",
  "message": "Unexpected token N in JSON at position 0",
  "stack": "SyntaxError: Unexpected token N in JSON at position 0\n    at Object.parse (native)\n    at Socket.process.stdin.on.err ($HOME/projects/opwire/sample-cmdline-node/bootstrap.js:37:28)\n    at emitNone (events.js:91:20)\n    at Socket.emit (events.js:185:7)\n    at endReadableNT (_stream_readable.js:974:12)\n    at _combinedTickCallback (internal/process/next_tick.js:74:11)\n    at process._tickCallback (internal/process/next_tick.js:98:9)"
}
```

### JSON input, plaintext output

Execute the following command:

```shell
./opwire-agent serve -p=8888 \
  --default-command="node example.js --input-format=json --output-format=text"
```

#### Valid input (a JSON object)

Make a HTTP request with `curl`:

```curl
curl -v \
  --request POST \
  --url 'http://localhost:8888/$?type=microservice&type=nodejs' \
  --data '{
  "name": "Opwire",
  "url": "https://opwire.org/"
}'
```

Result:

```plain
> POST /$?type=microservice&type=nodejs HTTP/1.1
> User-Agent: curl/7.35.0
> Host: localhost:8888
> Accept: */*
> Content-Length: 54
> Content-Type: application/x-www-form-urlencoded
>
* upload completely sent off: 54 out of 54 bytes
< HTTP/1.1 200 OK
< Content-Type: text/plain
< X-Exec-Duration: 0.092902
< Date: Fri, 15 Mar 2019 15:41:27 GMT
< Content-Length: 468
<
OPWIRE_EDITION:
{
  "revision": "416c9bd",
  "version": "v1.0.1-3-g416c9bd"
}

OPWIRE_REQUEST:
{
  "header": {
    "Accept": [
      "*/*"
    ],
    "Content-Length": [
      "54"
    ],
    "Content-Type": [
      "application/x-www-form-urlencoded"
    ],
    "User-Agent": [
      "curl/7.35.0"
    ]
  },
  "query": {
    "type": [
      "microservice",
      "nodejs"
    ]
  },
  "params": null
}

INPUT:
{
  "name": "Opwire",
  "url": "https://opwire.org/"
}
```

#### Invalid input (not a JSON object)

Make a HTTP request with `curl`:

```curl
curl -v \
  --request POST \
  --url 'http://localhost:8888/$?type=microservice&type=nodejs' \
  --data 'Not a JSON object'
```

Result:

```plain
> POST /$?type=microservice&type=nodejs HTTP/1.1
> User-Agent: curl/7.35.0
> Host: localhost:8888
> Accept: */*
> Content-Length: 17
> Content-Type: application/x-www-form-urlencoded
>
* upload completely sent off: 17 out of 17 bytes
< HTTP/1.1 500 Internal Server Error
< Content-Type: text/plain
< X-Error-Message: exit status 1
< Date: Fri, 15 Mar 2019 15:42:07 GMT
< Content-Length: 584
<
net.js:655
    throw new TypeError(
    ^

TypeError: Invalid data, chunk must be a string or buffer, not object
    at Socket.write (net.js:655:11)
    at $HOME/projects/opwire/sample-cmdline-node/example.js:12:22
    at Socket.process.stdin.on.err ($HOME/projects/opwire/sample-cmdline-node/bootstrap.js:37:5)
    at emitNone (events.js:91:20)
    at Socket.emit (events.js:185:7)
    at endReadableNT (_stream_readable.js:974:12)
    at _combinedTickCallback (internal/process/next_tick.js:74:11)
    at process._tickCallback (internal/process/next_tick.js:98:9)
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b your-new-feature`)
3. Commit your changes (`git commit -am "Add some feature"`)
4. Push to the branch (`git push origin your-new-feature`)
5. Create new Pull Request

## License

MIT

See [LICENSE](LICENSE) to see the full text.
