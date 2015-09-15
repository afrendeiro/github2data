#!/usr/bin/env node

// 4 things to edit:
// add here your github repo name (should match the project name to be run)
var projectName = 'name'
// this should point to the annotation sheet with a relative path within the repository
var metadata = 'metadata/sequencing_annotation.csv'
// add here the URL to the github webhook:
var webhook = ''
// add here your github secret for this webhook:
var secret = ''


// don't edit below!
function runPipelines(projectName, metadata) {
    var exec = require('child_process').exec
    var cmd = 'pipelines ' + projectName + ' ' + metadata

    exec(
        cmd,
        function (error, stdout, stderr) {
                console.log('stdout: ' + stdout)
                console.log('stderr: ' + stderr)
                if (error !== null) {
                         console.log('exec error: ' + error)
                }
        })
}

var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: webhook, secret: secret})

http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(7777)

handler.on('error', function (err) {
    console.error('Error:', err.message)
})

handler.on('push', function (event) {
    console.log('Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref)
    // run the pipelines!
    runPipelines(projectName, metadata)
})

handler.on('issues', function (event) {
    console.log('Received an issue event for %s action=%s: #%d %s',
        event.payload.repository.name,
        event.payload.action,
        event.payload.issue.number,
        event.payload.issue.title)
})
