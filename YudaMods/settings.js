require("./module")

global.owner = "6283842204546"
global.namabot = "YudaMods"
global.namaCreator = "YudaMods"
global.autoJoin = false
global.antilink = false
global.versisc = '3.0.0'
global.codeInvite = "CswK4kvQD1u7SfSmsYfMHZ" //JANGAN DI UBAH 
global.domain = '' // Isi Domain Lu
global.apikey = '' // Isi Apikey Plta Lu
global.capikey = '' // Isi Apikey Pltc Lu
global.eggsnya = '15' // id eggs yang dipakai
global.location = '1' // id location
global.imageurl = 'https://telegra.ph/file/d83457550ea0f9a0982f0.jpg'
global.isLink = 'https://chat.whatsapp.com/'
global.thumb = fs.readFileSync("./thumb.png")
global.audionya = fs.readFileSync("./all/sound.mp3")
global.simbol = 'ダ'
global.tekspushkon = ""
global.tekspushkonv2 = ""
global.packname = "© Created By"
global.author = "YudaMods Bot"
global.jumlah = "5"

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})