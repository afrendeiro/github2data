github2data
===========
A Github webhook that runs bioinformatics pipelines upon a push event

### Install
You'll need [node.js](https://nodejs.org) to be installed.

```bash
sudo apt-get install nodejs npm
```

Install the app globally:
```bash
npm i -g https://github.com/afrendeiro/github2data
```
or simply clone it
```bash
git clone https://github.com/afrendeiro/github2data
```

Both will install the [github-webhook-handler](https://github.com/rvagg/github-webhook-handler) dependency as well.

### Running the app

```bash
github2data
```
or clone the repo and run in its folder:
```bash
npm start
```
