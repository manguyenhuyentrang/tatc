#Requires -RunAsAdministrator
$ErrorActionPreference = 'Stop'
$ruleName = 'TATC-Prototype-HTTPS-8443'
$parameters = @{
    DisplayName = 'TATC Prototype HTTPS - mobile preview'
    Direction = 'Inbound'
    Action = 'Allow'
    Protocol = 'TCP'
    LocalPort = 8443
    LocalAddress = '10.15.73.21'
    RemoteAddress = '10.15.0.0/16'
    Program = 'C:\Program Files\nodejs\node.exe'
    Profile = 'Any'
    Description = 'Allow phones on the company LAN to access the local TATC PWA preview.'
}
$existing = Get-NetFirewallRule -Name $ruleName -ErrorAction SilentlyContinue
if ($existing) { $existing | Set-NetFirewallRule @parameters -Enabled True }
else { New-NetFirewallRule -Name $ruleName @parameters -Enabled True | Out-Null }
Get-NetFirewallRule -Name $ruleName | Select-Object Name, Enabled, Action | Format-List | Out-String | Set-Content -LiteralPath (Join-Path $env:TEMP 'tatc-preview-firewall.log')
# To undo: Remove-NetFirewallRule -Name 'TATC-Prototype-HTTPS-8443'
