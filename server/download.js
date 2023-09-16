import ytdl from 'ytdl-core'
import fs from 'fs'

export const download = (videoId) => new Promise((resolve, reject) => {
    const videoUrl = `https://youtube.com/shorts/${videoId}`
    console.log('Download video:', videoId)

    ytdl(videoUrl, { quality: "lowestaudio", filter: 'audioonly'})
    .on('info', 
    (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000

        if(seconds > 60){
            throw new Error('A duração desse vídeo é maior do que 60 segundos')
        }

    })
    .on('end', () => {
        console.log('Download do vídeo finalizado')

        resolve()
    })
    .on('error', (error) => {
        console.error(`Não foi possível fazer o download do vídeo ${error}`)

        reject(error)
    })
    .pipe(fs.createWriteStream('./tmp/audio.mp4'))
})