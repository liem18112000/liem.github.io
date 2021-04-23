const static_ver = "dev-v1"

const fileUrl = 'list.txt'

var elem = self

function setAssets(text, e){
    const assets = text.split('\r\n')

    console.log(assets)

    e.addEventListener("install", installEvent => {
        installEvent.waitUntil(
            caches.open(static_ver).then(cache => {
                cache.addAll(assets)
            })
        )
    })

    e.addEventListener("fetch", fetchEvent => {
        fetchEvent.respondWith(
            caches.match(fetchEvent.request).then(res => {
                return res || fetch(fetchEvent.request)
            })
        )
    })
}

fetch(fileUrl)
    .then(r => r.text())
    .then(t => setAssets(t, elem))


