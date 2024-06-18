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



