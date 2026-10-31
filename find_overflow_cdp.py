import asyncio
import json
import subprocess
import urllib.request
import websockets
import base64
import os
import time

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
URL = r"file:///c:/Users/PMLS/Downloads/safefile/repair/index.html"
OUTPUT_IMG = r"C:\Users\PMLS\.gemini\antigravity\brain\2f83e640-36fa-4aff-8dab-2ec548b1e743\mobile_iphone_cdp_fixed.png"

async def main():
    proc = subprocess.Popen([
        CHROME_PATH,
        "--headless=new",
        "--disable-gpu",
        "--remote-debugging-port=9222",
        "--no-first-run",
        "--no-default-browser-check",
        "about:blank"
    ])

    await asyncio.sleep(0.8)

    try:
        resp = urllib.request.urlopen("http://127.0.0.1:9222/json", timeout=2)
        tabs = json.loads(resp.read().decode())
        ws_url = tabs[0]["webSocketDebuggerUrl"]

        async with websockets.connect(ws_url, max_size=50*1024*1024) as ws:
            msg_id = 0
            async def call(method, params=None):
                nonlocal msg_id
                msg_id += 1
                payload = {"id": msg_id, "method": method}
                if params:
                    payload["params"] = params
                await ws.send(json.dumps(payload))
                while True:
                    raw = await ws.recv()
                    data = json.loads(raw)
                    if data.get("id") == msg_id:
                        return data.get("result", {})

            # Set mobile emulation to iPhone 390x844
            await call("Emulation.setDeviceMetricsOverride", {
                "width": 390,
                "height": 844,
                "deviceScaleFactor": 2,
                "mobile": True
            })

            await call("Page.enable")
            await call("Page.navigate", {"url": URL})
            await asyncio.sleep(1.5)

            # Evaluate layout and overflow
            res = await call("Runtime.evaluate", {
                "expression": """(() => {
                    const winW = window.innerWidth;
                    const docW = document.documentElement.scrollWidth;
                    const bodyW = document.body.scrollWidth;

                    const pill = document.querySelector('.hero-ref-trust-pill');
                    const pillLabel = document.querySelector('.hero-ref-pill-label');
                    const pillArrow = document.querySelector('.hero-ref-pill-arrow');

                    const pillR = pill ? pill.getBoundingClientRect() : null;
                    const labelR = pillLabel ? pillLabel.getBoundingClientRect() : null;
                    const arrowR = pillArrow ? pillArrow.getBoundingClientRect() : null;

                    // Elements overflowing 390
                    const overflowing = [];
                    document.querySelectorAll('*').forEach(el => {
                        const r = el.getBoundingClientRect();
                        if (r.right > winW + 1) {
                            overflowing.push({
                                tag: el.tagName,
                                class: (el.className && typeof el.className === 'string') ? el.className.slice(0, 50) : '',
                                id: el.id,
                                right: Math.round(r.right),
                                width: Math.round(r.width)
                            });
                        }
                    });

                    return {
                        winW,
                        docW,
                        bodyW,
                        pill: {
                            width: pillR ? Math.round(pillR.width) : null,
                            left: pillR ? Math.round(pillR.left) : null,
                            right: pillR ? Math.round(pillR.right) : null,
                            labelTop: labelR ? Math.round(labelR.top) : null,
                            arrowTop: arrowR ? Math.round(arrowR.top) : null,
                            isWrapped: (labelR && arrowR) ? (arrowR.top > labelR.bottom - 4) : false
                        },
                        overflowCount: overflowing.length,
                        topOverflowing: overflowing.slice(0, 10)
                    };
                })()""",
                "returnByValue": True
            })

            data = res.get("result", {}).get("value", {})
            print("Layout Analysis:")
            print(json.dumps(data, indent=2))

            # Take screenshot
            ss = await call("Page.captureScreenshot", {
                "format": "png",
                "clip": {
                    "x": 0,
                    "y": 0,
                    "width": 390,
                    "height": 844,
                    "scale": 1
                }
            })
            img_data = base64.b64decode(ss["data"])
            with open(OUTPUT_IMG, "wb") as f:
                f.write(img_data)
            print("Screenshot saved to:", OUTPUT_IMG)

    finally:
        proc.terminate()

if __name__ == "__main__":
    asyncio.run(main())
