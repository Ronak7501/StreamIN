const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const WebSocketServer = require('ws').Server;
const child_process = require('child_process');
const url = require('url');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;

    handle(req, res, parsedUrl);
  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on port ${port}`);
  });

  const wss = new WebSocketServer({
    server: server
  });

  wss.on('connection', (ws, req) => {
    console.log('Streaming socket connected');
    ws.send('WELL HELLO THERE FRIEND');

    const queryString = url.parse(req.url).search;
    console.log(queryString);
    const params = new URLSearchParams(queryString);
    console.log(params);
    const key = params.get('key');
    const rtmp = params.get('rtmpUrl')

    const rtmpUrl = `${rtmp}/${key}`;
    console.log(rtmpUrl);
  
  
    // const ffmpeg = child_process.spawn('ffmpeg', [
    //   '-i','-',

    //   // video codec config: low latency, adaptive bitrate
    //   '-c:v', 'libx264', '-b:v', '500k','-preset', 'ultrafast', '-tune', 'zerolatency',
    // //   '-c:v', 'libx264', '-preset', 'ultrafast', '-tune', 'zerolatency',

    //   // audio codec config: sampling frequency (11025, 22050, 44100), bitrate 64 kbits
    // //   '-c:a', 'aac', '-strict', '-2', '-ar', '44100', '-b:a', '64k',
    //     '-c:a', 'aac', '-b:a', '192k', '-ar', '48000',

    //   //force to overwrite
    //   '-y',

    //   // used for audio sync
    //   '-use_wallclock_as_timestamps', '1',
    //   '-async', '1',

    //   //'-filter_complex', 'aresample=44100', // resample audio to 44100Hz, needed if input is not 44100
    //   //'-strict', 'experimental',
    //   '-bufsize', '1000',
    //   '-f', 'flv',

    //   rtmpUrl
    // ]);

    // const ffmpeg = child_process.spawn('ffmpeg', [
    //   '-i', '-',
    //   '-c:v', 'libx264', // Video codec
    //   '-preset', 'ultrafast', // Fastest encoding preset
    //   '-tune', 'zerolatency', // Zero latency tuning
    //   '-b:v', '1500k', // Video bitrate (adjust as needed)
    //   '-c:a', 'aac', // Audio codec
    //   '-b:a', '128k', // Audio bitrate (adjust as needed)
    //   '-bufsize', '3000k', // Buffer size (adjust as needed)
    //   '-f', 'flv',
    //   '-y',
    //   rtmpUrl
    // ]);

    const ffmpeg = child_process.spawn('ffmpeg', [
      '-i', '-',

      // Video codec config: optimized for quality and low latency
      '-c:v', 'libx264', '-preset', 'veryfast', '-tune', 'zerolatency', '-profile:v', 'baseline', '-pix_fmt', 'yuv420p',
      
      // Audio codec config: AAC codec with higher bitrate for better quality
      '-c:a', 'aac', '-b:a', '128k', '-ar', '44100',

      // Force to overwrite
      '-y',

      // Additional settings for smoother streaming
      '-use_wallclock_as_timestamps', '1',
      '-async', '1',

      '-f', 'flv',
      '-bufsize', '512k',

      rtmpUrl
      
    ]);

    // Kill the WebSocket connection if ffmpeg dies.
    ffmpeg.on('close', (code, signal) => {
      console.log('FFmpeg child process closed, code ' + code + ', signal ' + signal);
      ws.terminate();
    });

    // Handle STDIN pipe errors by logging to the console.
    // These errors most commonly occur when FFmpeg closes and there is still
    // data to write.f If left unhandled, the server will crash.
    ffmpeg.stdin.on('error', (e) => {
      console.log('FFmpeg STDIN Error', e);
    });

    // FFmpeg outputs all of its messages to STDERR. Let's log them to the console.
    ffmpeg.stderr.on('data', (data) => {
      ws.send('ffmpeg got some data');
      console.log('FFmpeg STDERR:', data.toString());
    });

    ws.on('message', msg => {
      if (Buffer.isBuffer(msg)) {
        console.log('this is some video data');
        ffmpeg.stdin.write(msg);
      } else {
        console.log(msg);
      }
    });

    ws.on('close', e => {
      console.log('got closed');
      ffmpeg.kill('SIGINT');
    });
  });
});



