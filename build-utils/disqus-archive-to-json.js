#!/usr/bin/env node

const fs = require('fs')
const xmlToJson = require('xml2json').toJson
const shell = require('shelljs')


const sourceFilePath = process.argv[2]
if (!sourceFilePath) {
  throw new Error('First argument should be path to the source file')
}

const destinationDirPath = process.argv[3]
if (!destinationDirPath) {
  throw new Error('Second argument should be path to the destination dir')
}


const destFullPath = `${destinationDirPath}/disqus-arhive`
if (fs.existsSync(destFullPath)) {
  console.log(`Deleting ${destFullPath}`)
  shell.rm('-rf', destFullPath)
}
console.log(`Creating ${destFullPath}`)
fs.mkdirSync(destFullPath)


const sourceFile = fs.readFileSync(sourceFilePath)
const json = xmlToJson(sourceFile)

// extract threads (one root thread per extension)
const xmlObject = JSON.parse(json)
const threads = {}
xmlObject.disqus.thread.forEach(xmlThread => {
  if (xmlThread.isDeleted === 'true') {
    return
  }
  const thread = {
    id: xmlThread['dsq:id'],
    pageId: xmlThread.id,
    posts: []
  }
  if (xmlThread.forum !== 'ext-ulauncher-io') {
    throw new Error(`Unexpected forum id: ${xmlThread.forum}`)
  }
  threads[thread.id] = thread
})

// add posts to threads
const posts = {}
xmlObject.disqus.post.forEach(xmlPost => {
  if (xmlPost.isDeleted === 'true' || xmlPost.isSpam === 'true') {
    return
  }
  const post = {
    id: xmlPost['dsq:id'],
    message: xmlPost.message,
    createdAt: xmlPost.createdAt,
    author: xmlPost.author.name,
    thread: xmlPost.thread['dsq:id'],
    parent: xmlPost.parent && xmlPost.parent['dsq:id'],
    posts: []
  }
  posts[post.id] = post
  if (post.parent) {
    if (posts[post.parent]) {
      posts[post.parent].posts.push(post)
    } else {
      throw new Error(`Parent post "${post.parent}" not found`)
    }
  } else {
    threads[post.thread].posts.push(post)
  }
})

// console.log(JSON.stringify(threads, null, 2))
// save threads to separate files

Object.keys(threads).forEach(id => {
  const thread = threads[id]
  if (!thread.posts.length) {
    return
  }
  const extArchiveFile = `${destFullPath}/${thread.pageId}.json`
  console.log(`Saving to ${extArchiveFile}`)
  fs.writeFileSync(extArchiveFile, JSON.stringify(thread.posts, null, 2))
})