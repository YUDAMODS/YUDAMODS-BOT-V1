require("./global")

const mess = {
   wait: "Wait Kak Lagi Proses",
   success: "Sukses Kak`",
   on: "Sudah Aktif", 
   off: "Sudah Off",
   query: {
       text: "Teks Nya Mana Kak?",
       link: "Link Nya Mana Kak?",
   },
   error: {
       fitur: "Mohon Maaf Kak Fitur Eror Silahkan Chat Developer Bot Agar Bisa Segera Diperbaiki",
   },
   only: {
       group: "Maaf Kak Fitur Ini Hanya Bisa Digunakan Di Dalam Group",
       private: "Maaf Kak Fitur Ini Hanya Bisa Digunakan Di Dalam Private Chat",
       owner: "Maaf Kak Fitur Ini Hanya Bisa Digunakan Sama Owner Bot",
       admin: "Maaf Kak Fitur Ini Hanya Bisa Digunakan Sama Owner Bot",
       badmin: "Maaf Kak Kaya Nya Kakak Tidak Bisa Menggunakan Fitur Ini Di Karenakan Bot Bukan Admin Group",
       premium: "Maaf Kamu Belum Jadi User Premium Untuk Menjadi User Premium Silahkan Beli Ke Owner Dengan Cara Ketik .owner",
   }
}

global.mess = mess

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})