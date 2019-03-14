# opwire-agent: sample command line in Nodejs

## Install

Clone example source code from `github`:

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

Download and extract the latest [`opwire-agent`](https://github.com/opwire/opwire-agent/releases/latest) program into this directory:

![project-home-dir](https://raw.github.com/opwire/sample-cmdline-node/master/docs/assets/images/ls.png)

## Test the service using a web browser

Execute the following command:

```shell
./opwire-agent -p=8888 --default-command="node example.js"
```

Open this URL `http://localhost:8888/run?type=microservice&type=nodejs`:

![example-output](https://raw.github.com/opwire/sample-cmdline-node/master/docs/assets/images/example.png)


## Test the service using `curl`

### Default data format (`json`)

Execute the following command:

```shell
./opwire-agent -p=8888 --default-command="node example.js"
```

#### Valid input (a JSON object)

Make a HTTP request with `curl`:

```curl
curl -v \
  --request POST \
  --url 'http://localhost:8888/run?type=microservice&type=python' \
  --data '{
  "name": "Opwire",
	"url": "https://opwire.org/"
}'
```

Result:

```plain
> POST /run?type=microservice&type=python HTTP/1.1
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
        "python"
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
  --url 'http://localhost:8888/run?type=microservice&type=python' \
  --data 'Not a JSON object'
```

Result:

```plain
> POST /run?type=microservice&type=python HTTP/1.1
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
./opwire-agent -p=8888 \
  --default-command="node example.js --input-format=json --output-format=text"
```

#### Valid input (a JSON object)

Make a HTTP request with `curl`:

```curl
curl -v \
  --request POST \
  --url 'http://localhost:8888/run?type=microservice&type=python' \
  --data '{
  "name": "Opwire",
	"url": "https://opwire.org/"
}'
```

Result:

```plain
> POST /run?type=microservice&type=python HTTP/1.1
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
        "python"
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
  --url 'http://localhost:8888/run?type=microservice&type=python' \
  --data 'Not a JSON object'
```

Result:

```plain
> POST /run?type=microservice&type=python HTTP/1.1
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
< Date: Wed, 13 Mar 2019 07:20:12 GMT
< Content-Length: 583
<
net.js:655
    throw new TypeError(
    ^

TypeError: Invalid data, chunk must be a string or buffer, not object
    at Socket.write (net.js:655:11)
    at $HOME/projects/opwire/sample-cmdline-node/example.js:7:22
    at Socket.process.stdin.on.err ($HOME/projects/opwire/sample-cmdline-node/bootstrap.js:42:5)
    at emitNone (events.js:91:20)
    at Socket.emit (events.js:185:7)
    at endReadableNT (_stream_readable.js:974:12)
    at _combinedTickCallback (internal/process/next_tick.js:74:11)
    at process._tickCallback (internal/process/next_tick.js:98:9)
```

## License

MIT

See [LICENSE](LICENSE) to see the full text.
