# Dựng prototype từ mã nguồn – chạy: python3 tools/build.py   (từ thư mục prototype-src)
# Kết quả trong dist/:
#   prototype-test.html : bản đầy đủ, React nhúng sẵn, mở trực tiếp không cần mạng – dùng để chạy kiểm tra (test_jump.js, shot.js)
#   artifact.html       : nội dung để đăng lên claude.ai bằng công cụ Artifact (React tải từ cdnjs)
#   app-index.html      : index.html cho thư mục prototype-app (xem/cài app trên điện thoại)
import base64, json, re, os, sys
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + os.sep   # thư mục prototype-src
DS = R + 'ds' + os.sep
rd = lambda p: open(p, encoding='utf-8').read()
b64 = lambda p: base64.b64encode(open(p, 'rb').read()).decode()
# token màu, khoảng cách… từ ds/tokens.json
t = json.load(open(DS + 'tokens.json', encoding='utf-8'))
L = [':root{']
for x in t['color']['tokens']:
    v = x['value'] if isinstance(x['value'], str) else list(x['value'].values())[0]
    L.append(f'--{x["name"]}:{re.sub(r"^\{(.+)\}$", r"var(--\1)", v)};')
for fam in ['spacing', 'radius', 'shadow', 'size']:
    for x in t[fam]['tokens']: L.append(f'--{x["name"]}:{x["value"]};')
L.append('--font-sans:Roboto,system-ui,-apple-system,"Segoe UI",Arial,sans-serif;}')
tokens_css = '\n'.join(L)
fonts = ''.join(f"@font-face{{font-family:Roboto;src:url(data:font/woff2;base64,{b64(R+'assets/fonts/'+f+'.woff2')}) format('woff2');font-weight:{w};font-display:swap}}\n" for f, w in [('Roboto-Regular', 400), ('Roboto-Medium', 500), ('Roboto-Bold', 700)])
A = R + 'assets' + os.sep
img = f'window.__LOGO="data:image/png;base64,{b64(A+"logo.png")}";window.__VNEID="data:image/png;base64,{b64(A+"vneid.png")}";window.__SPLASH="data:image/jpeg;base64,{b64(A+"splash.jpg")}";window.__LOGIN_BG="data:image/jpeg;base64,{b64(A+"login-bg.jpg")}";window.__HERO="data:image/jpeg;base64,{b64(A+"hero.jpg")}";'
JS = ['s1.js', 's2.js', 's3.js', 's5.js', 'proto.js']
js = ''.join(rd(R + 'src/' + f) + '\n' for f in JS)
css = f"{fonts}{tokens_css}\n{rd(DS+'components/bundle.css')}\n{rd(R+'src/page.css')}\n{rd(R+'src/proto.css')}"
CDN = ('<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>\n'
       '<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>\n')
TITLE = 'Prototype TATC Gen UI'
def body(react):
    return (f'<title>{TITLE}</title>\n<meta name="claude:viewport-fit-sides" content="cover">\n<style>{css}</style>\n<div id="root"></div>\n'
            f'<script>{img}</script>\n{react}<script>{rd(DS+"components/bundle.js")}</script>\n<script>{js}</script>\n')
os.makedirs(R + 'dist', exist_ok=True)
art = body(CDN)
open(R + 'dist/artifact.html', 'w', encoding='utf-8').write(art)
inline = f'<script>{rd(DS+"vendor/react.production.min.js")}</script>\n<script>{rd(DS+"vendor/react-dom.production.min.js")}</script>\n'
test = ('<!doctype html>\n<html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        + body(inline).replace('<div id="root"></div>', '</head><body><div id="root"></div>', 1) + '</body></html>\n')
open(R + 'dist/prototype-test.html', 'w', encoding='utf-8').write(test)
app = rd(R + 'app-shell/head.html') + body('<script src="vendor/react.production.min.js"></script>\n<script src="vendor/react-dom.production.min.js"></script>\n') + rd(R + 'app-shell/tail.html')
open(R + 'dist/app-index.html', 'w', encoding='utf-8').write(app)
print('dist/artifact.html', len(art.encode()), '| dist/prototype-test.html', len(test.encode()), '| dist/app-index.html', len(app.encode()))
