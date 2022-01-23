const path = require('path');
const Hapi = require('@hapi/hapi');

const port = process.env.PORT || 3002;

const FILES = /\.(js|js.map|woff|woff2|svg|bmp|jpg|jpeg|gif|png|ico)(\?v=\d+\.\d+\.\d+)?$/;

const PATH = {
    '/': 'index.html',
    '/': 'main.html'
}

const init = async () => {
    const server = Hapi.server({
        port,
    });

    await server.register(require('@hapi/inert'));

    server.route({
        method: 'GET',
        path: '/{path*}',
        handler: (request, h) => {
            if (FILES.test(request.path)) {
                return h.file(path.join(process.cwd(), 'public', request.path));
            }
                console.log(request.path)
            return h.file(path.join(process.cwd(), 'public', PATH[request.path]));
        }
    })

    await server.start();
    console.log('Server running on %s', server.info.uri);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();