require("./YudaMods/global")

const require("./YudaMods/place")

const { Boom } = require('@hapi/boom')
const NodeCache = require('node-cache')
const { makeWASocket, AnyMessageContent, delay, DisconnectReason, fetchLatestBaileysVersion, getAggregateVotesInPollMessage, makeCacheableSignalKeyStore, makeInMemoryStore, PHONENUMBER_MCC, proto, useMultiFileAuthState, WAMessageContent, WAMessageKey } = require('@whiskeysockets/baileys')
const open = require('open')
const fs = require('fs')
const Pino = require('pino')
const chalk = require('chalk')
const readline = require('readline')
const PhoneNumber = require("awesome-phonenumber");
const usePairingCode = true;

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })


const question = (text) => {
  const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
  });
  return new Promise((resolve) => {
rl.question(text, resolve)
  })
};


async function startA03() {

const { state, saveCreds } = await useMultiFileAuthState("./session.json")
   let { version, isLatest } = await fetchLatestBaileysVersion();
const A03 = A03Connect({
logger: pino({ level: "silent" }),
printQRInTerminal: !usePairingCode,
auth: state,
browser: ['Chrome (Linux)', '', '']
});
if(usePairingCode && !A03.authState.creds.registered) {
		const phoneNumber = await question(color('\n\n\nSilahkan masukin nomor Whatsapp Awali dengan 62:\n', 'magenta'));
		const code = await A03.requestPairingCode(phoneNumber.trim())
		console.log(color(`âš ï¸Ž Kode Pairing Bot Whatsapp kamu :`,"gold"), color(`${code}`, "red"))
		
}
		
 
 
YudaMods.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
const reason = new Boom(lastDisconnect?.error)?.output.statusCode
console.log(color(lastDisconnect.error, 'deeppink'))
if (lastDisconnect.error == 'Error: Stream Errored (unknown)') {
process.exit()
} else if (reason === DisconnectReason.badSession) {
console.log(color(`Bad Session File, Please Delete Session and Scan Again`))
process.exit()
} else if (reason === DisconnectReason.connectionClosed) {
console.log(color('[SYSTEM]', 'white'), color('Connection closed, reconnecting...', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionLost) {
console.log(color('[SYSTEM]', 'white'), color('Connection lost, trying to reconnect', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionReplaced) {
console.log(color('Connection Replaced, Another New Session Opened, Please Close Current Session First'))
YudaMods.logout()
} else if (reason === DisconnectReason.loggedOut) {
console.log(color(`Device Logged Out, Please Scan Again And Run.`))
YudaMods.logout()
} else if (reason === DisconnectReason.restartRequired) {
console.log(color('Restart Required, Restarting...'))
await startA03()
} else if (reason === DisconnectReason.timedOut) {
console.log(color('Connection TimedOut, Reconnecting...'))
startA03()
}
} else if (connection === "connecting") {
start(`1`, `Connecting...`)
} else if (connection === "open") {
success(`1`, `Tersambung`)
if (autoJoin) {
YudaMods.groupAcceptInvite(codeInvite)
}
}
})

YudaMods.ev.on('messages.upsert', async (chatUpdate) => {
try {
m = chatUpdate.messages[0]
if (!m.message) return
m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
if (m.key && m.key.remoteJid === 'status@broadcast') return YudaMods.readMessages([m.key])
if (!YudaMods.public && !m.key.fromMe && chatUpdate.type === 'notify') return
if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
m = func.smsg(YudaMods, m, store)
require("./appearance")(YudaMods, m, store)
} catch (err) {
console.log(err)
}
})

YudaMods.ev.on('group-participants.update', async (anu) => {
console.log(anu)
try {
let metadata = await YudaMods.groupMetadata(anu.id)
let participants = anu.participants
for (let num of participants) {
try {
ppuser = await YudaMods.profilePictureUrl(num, 'image')
} catch {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
try {
ppgroup = await YudaMods.profilePictureUrl(anu.id, 'image')
} catch {
ppgroup = 'https://i.ibb.co/s2KvYYf/20230524-060103.png'
}
let nameUser = await YudaMods.getName(num)
let membr = metadata.participants.length
if (anu.action == 'add') {
await welcome(`${nameUser}`, `${metadata.subject}`, `${ppgroup}`, `${membr}`, `${ppuser}`, `https://i.ibb.co/LgWsTJC/1685442424826.jpg`)
YudaMods.sendMessage(anu.id, { image: fs.readFileSync(`./YudaMods/tmp/welcome1.png`), mentions: [num], caption: `✧━━━━━━[ *WELCOME* ]━━━━━━✧

┏––––––━━━━━━━━•
│⫹⫺ YT : ${nameUser}
┣━━━━━━━━┅┅┅
│( 👋 Hallo @${num.split('@')[0]} ⁩)
├[ *INTRO* ]—
│ *Nama:* 
│ *Umur:* 
│ *Gender:*
┗––––––━━┅┅┅

––––––┅┅ *DESCRIPTION* ┅┅––––––
${metadata.desc}` })
} else if (anu.action == 'remove') {
await goodbye(`${nameUser}`, `${metadata.subject}`, `${ppgroup}`, `${membr}`, `${ppuser}`, `https://i.ibb.co/LgWsTJC/1685442424826.jpg`)
YudaMods.sendMessage(anu.id, { image: fs.readFileSync(`./YudaMods/tmp/goodbye1.png`), mentions: [num], caption: `✧━━━━━━[ *GOOD BYE* ]━━━━━━✧
Sayonara *@${num.split('@')[0]}* 👋

*G O O D B Y E*'` })
}
}
} catch (err) {
console.log(err)
}
})

YudaMods.ev.on('contacts.update', (update) => {
for (let contact of update) {
let id = YudaMods.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

YudaMods.public = true

YudaMods.ev.on('creds.update', saveCreds)
return YudaMods
}

startA03()