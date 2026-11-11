$ErrorActionPreference = 'Stop'
$opensslCommand = Get-Command openssl -ErrorAction SilentlyContinue
$openssl = if ($opensslCommand) { $opensslCommand.Source } else { 'C:\Program Files\Git\usr\bin\openssl.exe' }
if (-not (Test-Path -LiteralPath $openssl)) { throw 'Cần OpenSSL (có sẵn trong Git for Windows) để tạo chứng chỉ HTTPS.' }
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw 'Cần Node.js để chạy server.' }

# Khóa riêng nằm ngoài thư mục được server chia sẻ.
$stateDir = Join-Path ([System.IO.Path]::GetTempPath()) 'tatc-preview-https'
New-Item -ItemType Directory -Path $stateDir -Force | Out-Null
$caKey = Join-Path $stateDir 'ca.key'
$caCert = Join-Path $stateDir 'ca.crt'
$serverKey = Join-Path $stateDir 'server.key'
$serverCert = Join-Path $stateDir 'server.crt'
$serverCsr = Join-Path $stateDir 'server.csr'
$serverConfig = Join-Path $stateDir 'server.cnf'
function OpenSsl {
    $previousPreference = $ErrorActionPreference
    $ErrorActionPreference = 'Continue'
    $output = & $openssl @args 2>&1
    $exitCode = $LASTEXITCODE
    $ErrorActionPreference = $previousPreference
    if ($exitCode -ne 0) { throw ('OpenSSL: ' + ($output -join ' ')) }
}
if (-not ((Test-Path -LiteralPath $caKey) -and (Test-Path -LiteralPath $caCert))) {
    OpenSsl genrsa -out $caKey 2048
    OpenSsl req -x509 -new -key $caKey -out $caCert -sha256 -days 365 -subj '/CN=TATC Local Preview CA/O=TATC Preview' -addext 'basicConstraints=critical,CA:TRUE,pathlen:0' -addext 'keyUsage=critical,keyCertSign,cRLSign'
}
OpenSsl x509 -checkend 86400 -noout -in $caCert
$addresses = @(& node -e "for(const list of Object.values(require('os').networkInterfaces()))for(const a of list||[])if(a.family==='IPv4'&&!a.internal)console.log(a.address)")
$san = @('DNS:localhost', 'IP:127.0.0.1') + @($addresses | ForEach-Object { 'IP:' + $_ })
@"
[req]
distinguished_name=dn
prompt=no
req_extensions=extensions
[dn]
CN=TATC Local Preview
O=TATC Preview
[extensions]
basicConstraints=critical,CA:FALSE
keyUsage=critical,digitalSignature,keyEncipherment
extendedKeyUsage=serverAuth
subjectAltName=$($san -join ',')
"@ | Set-Content -LiteralPath $serverConfig -Encoding ascii
OpenSsl genrsa -out $serverKey 2048
OpenSsl req -new -key $serverKey -out $serverCsr -config $serverConfig
OpenSsl x509 -req -in $serverCsr -CA $caCert -CAkey $caKey -CAcreateserial -out $serverCert -days 90 -sha256 -extfile $serverConfig -extensions extensions
Copy-Item -LiteralPath $caCert -Destination (Join-Path $PSScriptRoot 'preview-ca.crt') -Force
Write-Host 'Chung chi CA cong khai: preview-ca.crt. Khong chia se ca.key/server.key.'
Write-Host 'Cai chung chi tren dien thoai theo mobile-setup.html, sau do mo https://IP:8443/.'
& node (Join-Path $PSScriptRoot 'server.js') 8443 --https --cert $serverCert --key $serverKey
exit $LASTEXITCODE
