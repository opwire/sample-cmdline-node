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

Download & save latest `opwire-agent` to here:

![project-home-dir](https://raw.github.com/opwire/sample-cmdline-node/master/docs/assets/images/ls.png)

## Run

Execute the following command:

```shell
./opwire-agent -p=8888 --default-command="node example"
```

Make a simple REST request:

```curl
curl "http://localhost:8888/run?type=microservice&type=nodejs"
```

or open with a web browser:

![example-output](https://raw.github.com/opwire/sample-cmdline-node/master/docs/assets/images/example.png)

## License

MIT

See [LICENSE](LICENSE) to see the full text.
