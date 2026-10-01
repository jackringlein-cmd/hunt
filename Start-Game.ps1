$ErrorActionPreference = 'Stop'
$gameDirectory = $PSScriptRoot
$gameAddress = 'http://127.0.0.1:4173'
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
$nodeLocation = if ($nodeCommand) { $nodeCommand.Source } else { Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' }
if (-not (Test-Path -LiteralPath $nodeLocation)) {
    Start-Process -FilePath (Join-Path $gameDirectory 'index.html')
    exit
}
$alreadyRunning = $false
try {
    $response = Invoke-WebRequest -Uri $gameAddress -UseBasicParsing -TimeoutSec 2
    $alreadyRunning = $response.Content.Contains('The Hunt for the Necromancer')
} catch { }
if (-not $alreadyRunning) {
    Start-Process -FilePath $nodeLocation -ArgumentList 'server.js' -WorkingDirectory $gameDirectory -WindowStyle Hidden
    Start-Sleep -Milliseconds 900
}
Start-Process -FilePath $gameAddress
