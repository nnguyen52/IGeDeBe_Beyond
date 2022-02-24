import httpProxy from 'http-proxy';
export const config = {
  api: {
    bodyParser: false,
  },
};
const proxy = httpProxy.createProxyServer();
export default function handler(req, res) {
  if (req.method !== 'POST') {
    // later instead of sending json, redirect to customized notfound page
    // in customized notfound page, useEffect -> after 3 seconds redirect to homepage
    res
      .status(400)
      .json({ message: 'Something went wrong. You will be redirected to Home page soon! ' });
  }
  return new Promise((resolve) => {
    // don't send cookies to API server
    req.headers.cookie = '';
    const handleLoginResponse = (proxyRes, req, res) => {
      var body = '';
      proxyRes.on('data', function (data) {
        body += data.toString();
      });

      // can set http only to cookie here (if necessary)
      proxyRes.on('end', function () {
        try {
          body = body.toString();
          res.json(JSON.parse(body));
        } catch (e) {
          return res
            .status(404)
            .json({ message: 'Something went wrong. Please try different pages.' });
        }
      });
    };
    proxy.once('proxyRes', handleLoginResponse);
    proxy.web(req, res, {
      target: `${process.env.REACT_APP_APIURL_BACKEND}`,
      changeOrigin: true,
      selfHandleResponse: true,
    });

    proxy.once('proxyRes', () => {
      resolve(true);
    });
  });
}
