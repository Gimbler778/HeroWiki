$ErrorActionPreference = "Stop"

$envFile = Join-Path $PSScriptRoot ".env"
if (-not (Test-Path $envFile)) {
    throw "Missing .env file at $envFile"
}

Get-ChildItem Env: | Where-Object { $_.Name -like "SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_*" } | ForEach-Object {
    [Environment]::SetEnvironmentVariable($_.Name, $null, "Process")
}

Get-Content $envFile | ForEach-Object {
    $line = $_.Trim()
    if (-not $line -or $line.StartsWith("#")) {
        return
    }

    $parts = $line -split "=", 2
    if ($parts.Count -ne 2) {
        return
    }

    $name = $parts[0].Trim()
    $value = $parts[1].Trim().Trim('"')
    if ([string]::IsNullOrWhiteSpace($value)) {
        [Environment]::SetEnvironmentVariable($name, $null, "Process")
    }
    else {
        [Environment]::SetEnvironmentVariable($name, $value, "Process")
    }
}

Write-Host "Loaded backend/.env into current process."
Write-Host "Starting Spring Boot..."

mvn spring-boot:run
