const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 🔀 Subdomain Routing Middleware
app.use((req, res, next) => {
    const host = req.headers.host || '';

    if (host.startsWith('cad.')) {
        return express.static(path.join(__dirname, 'cad'))(req, res, next);
    } else if (host.startsWith('auto.')) {
        return express.static(path.join(__dirname, 'auto'))(req, res, next);
    } else if (host.startsWith('repair.')) {
        return express.static(path.join(__dirname, 'repair'))(req, res, next);
    } else if (host.startsWith('web.')) {
        return express.static(path.join(__dirname, 'web'))(req, res, next);
    }

    next();
});

// Serve main static files (index.html, services.html, etc.)
app.use(express.static(__dirname));

// Clean URLs handler (allows accessing /services instead of /services.html)
app.get('/:page', (req, res, next) => {
    const cleanPath = path.join(__dirname, `${req.params.page}.html`);
    res.sendFile(cleanPath, (err) => {
        if (err) next();
    });
});

app.listen(PORT, () => {
    console.log(`Server node online running on port ${PORT}`);
});
