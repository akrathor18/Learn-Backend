import { serve } from "bun";
import { log } from "util";

serve({
    fetch(request) {
        const url = new URL(request.url);

        if (url.pathname === '/') {
            return new Response('Hello user', { status: 200 });
        }

        else if (url.pathname === '/ashish') {
            return new Response('Hello Ashish', { status: 200 });
        }

        else {
            return new Response('404 Not Found', { status: 404 });
        }
    },
    port: 3000,
    hostname: 'localhost'
});
